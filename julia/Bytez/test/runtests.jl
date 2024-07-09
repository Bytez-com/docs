using Test
using Bytez
using JSON3

const client = Bytez.init(get(ENV, "BYTEZ_KEY", ""))

@testset "Bytez.jl" begin
    @testset "list models" begin
        list = client.list.models()
        @test isa(list, JSON3.Array)
        @test length(list) != 0
        @test all(model -> haskey(model, "modelId") && haskey(model, "ramRequired"), list)
    end

    @testset "lists running instances" begin
        instances = client.list.instances()
        @test isa(instances, JSON3.Array)
    end

    modelId = "openai-community/gpt2"
    model = client.model(modelId)

    @testset "creates a model class" begin
        @test model.id == modelId
    end

    @testset "starts a model" begin
        json = model.start()
        status = get(json, "status", "")  
        error = get(json, "error", "")  

        if status === "started"
            @test true
        else
            @test (occursin("already loaded", error) || occursin("operation already in progress: load", error))
        end
    end

    @testset "returns model status" begin
        json = model.status()
       
        @test  json["status"] in ["STARTING", "RUNNING", "INSTANTIATING"]
    end

    @testset "awaits model load" begin
        model.load()
        json = model.status()
        
        @test json["status"] == "RUNNING"
    end

    @testset "runs a model" begin
        response = model.run("Jack and jill")
        
        @test typeof(response["output"][1]["generated_text"]) === String
    end

    @testset "runs a model with params" begin
        input = "Jack and Jill "
        response = model.run(input, Dict("min_new_tokens" => 1, "max_new_tokens" => 1))
        newText = response["output"][1]["generated_text"]
        
        @test typeof(newText) === String
        @test length(split(newText)) <= length(split(strip(input))) + 1
    end

    @testset "stops a model" begin
        model.stop()
        json = model.status()
        
        @test json["status"] != "RUNNING"
    end
end
