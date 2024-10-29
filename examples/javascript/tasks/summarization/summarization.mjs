import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const inputText = `
The Big Bang is a physical theory that describes how the universe expanded from an initial state of high density and temperature.[1] The notion of an expanding universe was first scientifically originated by physicist Alexander Friedmann in 1922 with the mathematical derivation of the Friedmann equations.[2][3][4][5]

Independent of Friedmann's work, the Big Bang was first proposed in 1931 by Roman Catholic priest and physicist Georges Lemaître when he suggested the universe emerged from a "primeval atom". Various cosmological models of the Big Bang explain the evolution of the observable universe from the earliest known periods through its subsequent large-scale form.[6][7][8] These models offer a comprehensive explanation for a broad range of observed phenomena, including the abundance of light elements, the cosmic microwave background (CMB) radiation, and large-scale structure. The uniformity of the universe, known as the flatness problem, is explained through cosmic inflation: a sudden and very rapid expansion of space during the earliest moments.

Crucially, these models are compatible with the Hubble–Lemaître law—the observation that the farther away a galaxy is, the faster it is moving away from Earth. Extrapolating this cosmic expansion backward in time using the known laws of physics, the models describe an increasingly concentrated cosmos preceded by a singularity in which space and time lose meaning (typically named "the Big Bang singularity").[9] Physics lacks a widely accepted theory of quantum gravity that can model the earliest conditions of the Big Bang. In 1964 the CMB was discovered, which convinced many cosmologists that the competing steady-state model of cosmic evolution was falsified, since the Big Bang models predict a uniform background radiation caused by high temperatures and densities in the distant past.[10] A wide range of empirical evidence strongly favors the Big Bang event, which is now essentially universally accepted.[11] Detailed measurements of the expansion rate of the universe place the Big Bang singularity at an estimated 13.787±0.020 billion years ago, which is considered the age of the universe.[12]

There remain aspects of the observed universe that are not yet adequately explained by the Big Bang models. After its initial expansion, the universe cooled sufficiently to allow the formation of subatomic particles, and later atoms. The unequal abundances of matter and antimatter that allowed this to occur is an unexplained effect known as baryon asymmetry. These primordial elements—mostly hydrogen, with some helium and lithium—later coalesced through gravity, forming early stars and galaxies. Astronomers observe the gravitational effects of an unknown dark matter surrounding galaxies. Most of the gravitational potential in the universe seems to be in this form, and the Big Bang models and various observations indicate that this excess gravitational potential is not created by baryonic matter, such as normal atoms. Measurements of the redshifts of supernovae indicate that the expansion of the universe is accelerating, an observation attributed to an unexplained phenomenon known as dark energy.[13]
`;

const model = client.model("ainize/bart-base-cnn");

await model.load();

const { output: [{ summary_text } = {}] = [] } = await model.run(inputText, {
  max_length: 40
});

console.log(summary_text);
