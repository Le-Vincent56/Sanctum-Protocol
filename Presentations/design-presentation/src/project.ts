import {makeProject} from '@motion-canvas/core';

import introduction from "./scenes/introduction?scene";
import codeHighLevel from "./scenes/code-high-level?scene";
import codeUnityExample from "./scenes/code-unity-example?scene"
import codeWhy from "./scenes/code-why?scene";

import './globals.css';

export default makeProject({
  scenes: [introduction, codeHighLevel, codeUnityExample, codeWhy],
  variables: {
      dark: '#1c1c1c',
      light: '#eeeeee',
      pink: '#ec008c',
      verdigris: '#43b3ae'
  }
});
