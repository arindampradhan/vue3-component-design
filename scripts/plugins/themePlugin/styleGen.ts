import fs from "fs-extra";
import { rgba } from "polished";
import dictionary from "style-dictionary";
import transform from "./transform";

let theme;

const styleDictionaryConfig = {
  source: [`../galaxy-${theme}/${theme}-temp-tokens/*.json`],
  platforms: {
    css: {
      buildPath: `../galaxy-${theme}/dist/`,
      transforms: [
        "color/rgb",
        "fontWeights",
        "shadow",
        "typography",
        "customColor",
      ],
      files: [
        {
          destination: `${theme}.css`,
          format: "gdsFormat",
          options: {
            showFileHeader: false,
            outputReferences: true,
          },
        },
      ],
    },
  },
};

const StyleDictionary = dictionary.extend(styleDictionaryConfig);
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;
const { registerTransform, registerFormat, buildAllPlatforms } = StyleDictionary;

registerTransform({
  name: "customColor",
  type: "value",
  transitive: true,
  matcher: (prop) => prop.type === "color",
  transformer: (prop) => {
    try {
      if (prop.value.includes("rgba")) {
        const transform = prop.value
          .replace("rgba(", "")
          .replace(")", "")
          .replace("%", "")
          .split(",")
          .map((item, index) => (index === 1 ? Number(item) : item))
          .map((item, index) => (index === 1 && item > 1 ? item / 100 : item));
        return rgba.apply(null, transform);
      }
    } catch (err) {
      console.log(err);
    }
    return prop.original.value;
  },
});

registerTransform({
  name: "fontWeights",
  type: "value",
  transitive: false,
  matcher: (prop) => prop.type === "fontWeights",
  transformer: (prop) => {
    const fontWeightMapper = {
      Regular: 400,
      Medium: 500,
    };
    return fontWeightMapper[prop.original.value] ?? prop.original.value;
  },
});

registerTransform({
  name: "shadow",
  type: "value",
  transitive: true,
  matcher: (prop) => prop.type === "boxShadow",
  transformer: (prop) => {
    let finalShadowVal = "";
    prop.original.value.forEach((obj) => {
      finalShadowVal += finalShadowVal.length > 0 ? " , " : "";
      finalShadowVal += `${obj.x}px ${obj.y}px ${obj.blur}px ${obj.spread}px ${obj.color}`;
    });
    return finalShadowVal;
  },
});

registerTransform({
  name: "typography",
  type: "value",
  transitive: true,
  matcher: (prop) => prop.type === "typography",
  transformer: (prop) => {
    const { fontWeight, fontSize, lineHeight, fontFamily } = prop.value;
    return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  },
});

registerFormat({
  name: "gdsFormat",
  formatter: ({ dictionary, file, options }) => {
    const { outputReferences } = options;
    return `${fileHeader({ file })}
			:root[theme="${theme}"] {
				${formattedVariables({ format: "css", dictionary, outputReferences })}
			}
		`;
  },
});
	

export default (theme: string) => {
	theme = theme;
	buildAllPlatforms();
}