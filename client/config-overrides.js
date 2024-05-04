const { override, useBabelRc, disableEsLint } = require("customize-cra");

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc(), disableEsLint());

// (config, env) => {
//     // Find the TypeScript rule
//     const tsRule = config.module.rules.find(
//         rule => rule.test && rule.test.toString().includes("tsx")
//     );

//     if (tsRule) {
//         // Modify the TypeScript rule to support JSX
//         tsRule.test = /\.(ts|tsx)$/;
//         tsRule.use[0].options.compilerOptions = {
//             ...tsRule.use[0].options.compilerOptions,
//             jsx: "react", // or 'preserve' if you're using another tool to transform JSX, like Babel
//         };
//     }

//     return config;
// }
