import {makeProject} from '@motion-canvas/core';

import introduction from "./scenes/introduction?scene";
import artStyleGuide from "./scenes/art-style-guide?scene";
import artEnvironment from "./scenes/art-environment?scene";
import artCharacter from "./scenes/art-character?scene";
import artShaderVfx from "./scenes/art-shader-vfx?scene";
import codeHighLevel from "./scenes/code-high-level?scene";
import codeUnityExample from "./scenes/code-unity-example?scene"
import codeWhy from "./scenes/code-why?scene";
import codeBranchingModel from "./scenes/code-branching-model?scene";
import designObjective from './scenes/design-objective?scene';
import designGameLoop from './scenes/design-game-loop?scene';
import designNetwork from './scenes/design-network?scene';
import designNodes from './scenes/design-nodes?scene';
import designBattle from './scenes/design-battle?scene';
import uiBattle from './scenes/ui-battle?scene';

import './globals.css';

export default makeProject({
  scenes: [
      introduction,
      designObjective, designGameLoop, designNetwork, designNodes, designBattle,
      uiBattle,
      artStyleGuide, artEnvironment, artCharacter, artShaderVfx,
      codeHighLevel, codeUnityExample, codeWhy, codeBranchingModel,
  ],
  variables: {
      dark: '#1c1c1c',
      light: '#eeeeee',
      pink: '#ec008c',
      verdigris: '#43b3ae'
  }
});
