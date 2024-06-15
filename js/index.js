"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _Bytez_client, _Model_client, _Model_body;
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(apiKey) {
        this.auth = {};
        this.auth = { Authorization: `Key ${apiKey}` };
    }
    _request() {
        return __awaiter(this, arguments, void 0, function* (path = "", body, stream = false) {
            try {
                const res = yield fetch(`https://api.bytez.com/${path}`, {
                    method: body ? "POST" : "GET",
                    body: body ? JSON.stringify(body) : undefined,
                    headers: body
                        ? Object.assign(Object.assign({}, this.auth), { "Content-Type": "application/json" }) : this.auth
                });
                if (stream) {
                    return res.body;
                }
                else {
                    const json = yield res.json();
                    if (res.ok) {
                        return json;
                    }
                    else {
                        throw json.error;
                    }
                }
            }
            catch (error) {
                return { error };
            }
        });
    }
}
class Bytez {
    constructor(apiKey) {
        _Bytez_client.set(this, void 0);
        this.list = {
            /** List models available via this API, and shows their RAM requirements */
            models: () => __classPrivateFieldGet(this, _Bytez_client, "f")._request("model/list"),
            /** List running serverless instances */
            runningInstances: () => __classPrivateFieldGet(this, _Bytez_client, "f")._request("model/instances")
        };
        /**
         * Make a HuggingFace model serverless + available on this API! Running this command queues a job. You'll receive an email when the model is ready.
         * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
         */
        this.process = () => __classPrivateFieldGet(this, _Bytez_client, "f")._request("model/job");
        __classPrivateFieldSet(this, _Bytez_client, new Client(apiKey), "f");
    }
    /**
     * Load a serverless model
     * @param modelId The HuggingFace modelId, for example `openai-community/gpt2`
     * @param options Serverless configuration
     */
    load(modelId_1) {
        return __awaiter(this, arguments, void 0, function* (modelId, options = {}) {
            const model = new Model(__classPrivateFieldGet(this, _Bytez_client, "f"), modelId, options);
            yield __classPrivateFieldGet(this, _Bytez_client, "f")._request("model/load", Object.assign({ model: modelId }, model.options));
            return model;
        });
    }
}
_Bytez_client = new WeakMap();
exports.default = Bytez;
class Model {
    constructor(client, modelId, options = {}) {
        _Model_client.set(this, void 0);
        _Model_body.set(this, void 0);
        __classPrivateFieldSet(this, _Model_client, client, "f");
        this.id = modelId;
        this.options = options;
        __classPrivateFieldSet(this, _Model_body, { model: this.id }, "f");
    }
    // methods
    /** Check the loaded model's status */
    status() {
        return __classPrivateFieldGet(this, _Model_client, "f")._request("model/status", __classPrivateFieldGet(this, _Model_body, "f"));
    }
    /** Shutdown a loaded model */
    terminate() {
        return __classPrivateFieldGet(this, _Model_client, "f")._request("model/delete", __classPrivateFieldGet(this, _Model_body, "f"));
    }
    /** Run model */
    run(input, options = {}) {
        if (typeof input !== "string") {
            throw "Sorry, only text inputs are allowed for now";
        }
        const { stream = true } = options, params = __rest(options, ["stream"]);
        return __classPrivateFieldGet(this, _Model_client, "f")._request("model/run", Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Model_body, "f")), { prompt: input, params, stream }), stream);
    }
}
_Model_client = new WeakMap(), _Model_body = new WeakMap();
