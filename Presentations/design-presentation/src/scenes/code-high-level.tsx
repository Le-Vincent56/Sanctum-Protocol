import {makeScene2D, Rect, Txt, Img, Line} from "@motion-canvas/2d"
import {
    all,
    beginSlide,
    chain,
    createRef, delay,
    easeInExpo, easeOutExpo,
    fadeTransition,
    makeRef,
    useScene
} from "@motion-canvas/core"
import { EdgeStrokeTxt } from "../types/EdgeStrokeTxt";

import prevBackground from '../img/art-background.jpg';
import background from "../img/programming-background.jpg";

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const overlay = createRef<Rect>();
    const fromBackground = createRef<Img>();
    const toBackground = createRef<Img>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    const mainBoxes = createRef<Rect>();
    
    const layers: Rect[] = [];
    const layerOutlines: Line[] = [];
    const layerNames: Txt[] = [];
    const simSubDiagrams: Rect[] = [];
    const adaptSubDiagrams: Rect[] = [];
    const presentationSubDiagrams: Rect[] = [];
    const presentationToAdaptLines: Line[] = [];
    const adaptToSimulationLines: Line[] = [];
    const simulationLines: Line[] = [];
    const simulationToAdapt = createRef<Line>();
    const adaptToPresentation: Line[] = [];
    
    const simExtendedWidth = 900;
    const simExtendedHeight = 260;
    const simExtendedY = -360;
    const adapterExtendedWidth = 1300;
    const adapterExtendedHeight = 275;
    const adapterExtendedY = -65;
    const presentationExtendedWidth = 1700;
    const presentationExtendedHeight = 380;
    const presentationExtendedY = 290;
    const subBoxHeight = 100;
    const subBoxLineWidth = 1.5;

    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');

    const headerProps = {
        fontFamily: 'Bokor',
        fontStyle: 'normal',
        fontSize: 200,
        leftEdgeColor: VERDIGRIS,
        rightEdgeColor: PINK,
        edgeOffset: 2
    }
    
    const layerBox = {
        width: 600,
        height: 200,
        fill: DARK,
        opacity: 0,
    }
    
    const outline = {
        stroke: LIGHT,
        lineWidth: 3,
        end: 0,
    }
    
    const outlineBox = {
        stroke: LIGHT,
        lineWidth: 3,
        fill: DARK,
        end: 0,
        width: 600,
        height: 200,
    }
    
    const bodyText = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 60,
        fill: LIGHT,
        opacity: 0,
    }
    
    const subBodyText = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 30,
        fill: LIGHT,
    }
    
    const diagramLine = {
        lineWidth: 2,
        stroke: VERDIGRIS,
        startOffset: 20,
        endOffset: 20,
        endArrow: true,
        arrowSize: 10,
        end: 0,
    }
    

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK}>
            <Img ref={fromBackground} src={prevBackground} rotation={-30} x={-100} scale={0.45}/>
            <Img ref={toBackground} src={background} opacity={0}/>
            <Rect ref={overlay} width={'100%'} height={'100%'} fill={'#000000'} opacity={0.5}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Art'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Shaders / VFX'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <Rect ref={mainBoxes} width={'100%'} height={'80%'} y={40} x={0}>
                <Rect ref={makeRef(layers, 0)} {...layerBox} y={-230}>
                    <Txt ref={makeRef(layerNames, 0)} text={'Simulation'} {...bodyText}/>
                </Rect>
                <Line ref={makeRef(layerOutlines, 0)} points={() => [
                    layers[0].topLeft(),
                    layers[0].topRight(),
                    layers[0].bottomRight(),
                    layers[0].bottomLeft(),
                    layers[0].topLeft(),
                ]} {...outline}/>
                <Rect ref={makeRef(layers, 1)} {...layerBox} y={0}>
                    <Txt ref={makeRef(layerNames, 1)} text={'Adapter'} {...bodyText}/>
                </Rect>
                <Line ref={makeRef(layerOutlines, 1)} points={() => [
                    layers[1].topLeft(),
                    layers[1].topRight(),
                    layers[1].bottomRight(),
                    layers[1].bottomLeft(),
                    layers[1].topLeft(),
                ]} {...outline}/>
                <Rect ref={makeRef(layers, 2)} {...layerBox} y={230}>
                    <Txt ref={makeRef(layerNames, 2)} text={'Presentation'} {...bodyText}/>
                </Rect>
                <Line ref={makeRef(layerOutlines, 2)} points={() => [
                    layers[2].topLeft(),
                    layers[2].topRight(),
                    layers[2].bottomRight(),
                    layers[2].bottomLeft(),
                    layers[2].topLeft(),
                ]} {...outline}/>
            </Rect>

            <Rect width={'100%'} height={'100%'} x={0}>
                <Rect width={simExtendedWidth} height={simExtendedHeight} y={simExtendedY}>
                    <Rect ref={makeRef(simSubDiagrams, 0)} {...outlineBox} end={1} width={225} x={-275} y={-30}
                          height={subBoxHeight - 40} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Command Sink'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(simSubDiagrams, 1)} {...outlineBox} end={1} width={200} y={-30}
                          height={subBoxHeight - 40} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Systems'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(simSubDiagrams, 2)} {...outlineBox} end={1} width={200} x={275} y={-30}
                          height={subBoxHeight - 40} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Result'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(simSubDiagrams, 3)} {...outlineBox} end={1} width={200} x={125} y={60}
                          height={subBoxHeight - 40} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'State Models'} {...subBodyText}/>
                    </Rect>
                </Rect>
                <Rect width={adapterExtendedWidth} height={adapterExtendedHeight} y={adapterExtendedY}>
                    <Rect ref={makeRef(adaptSubDiagrams, 0)} {...outlineBox} end={1} width={250} x={-400}
                          height={subBoxHeight} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Command Router'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(adaptSubDiagrams, 1)} {...outlineBox} end={1} width={200} x={100}
                          height={subBoxHeight} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Data Mappers'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(adaptSubDiagrams, 2)} {...outlineBox} end={1} width={200} x={400}
                          height={subBoxHeight} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Dispatcher'} {...subBodyText}/>
                    </Rect>
                </Rect>
                <Rect width={presentationExtendedWidth} height={presentationExtendedHeight} y={presentationExtendedY}>
                    <Rect ref={makeRef(presentationSubDiagrams, 0)} {...outlineBox} end={1} width={300} x={-600}
                          height={subBoxHeight} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Unity Interactions'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(presentationSubDiagrams, 1)} {...outlineBox} end={1} width={200}  x={600} y={-105}
                          height={subBoxHeight - 20} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'UI / HUD'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(presentationSubDiagrams, 2)} {...outlineBox} end={1} width={200}  x={600} y={0}
                          height={subBoxHeight - 20} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'VFX'} {...subBodyText}/>
                    </Rect>
                    <Rect ref={makeRef(presentationSubDiagrams, 3)} {...outlineBox} end={1} width={200}  x={600} y={105}
                          height={subBoxHeight - 20} opacity={0} lineWidth={subBoxLineWidth}>
                        <Txt text={'Audio'} {...subBodyText}/>
                    </Rect>
                </Rect>
            </Rect>

            <Line ref={makeRef(presentationToAdaptLines, 0)} points={[
                presentationSubDiagrams[0].absolutePosition().addY(-presentationSubDiagrams[0].height() / 2),
                adaptSubDiagrams[0].absolutePosition().addY(adaptSubDiagrams[0].height() / 2).addX(-50),
            ]} {...diagramLine}/>
            <Line ref={makeRef(adaptToSimulationLines, 0)} points={[
                adaptSubDiagrams[0].absolutePosition().addY(-adaptSubDiagrams[0].height() / 2),
                simSubDiagrams[0].absolutePosition().addY(simSubDiagrams[0].height() / 2),
            ]} {...diagramLine}/>
            <Line ref={makeRef(adaptToSimulationLines, 1)} points={[
                adaptSubDiagrams[1].absolutePosition().addY(-adaptSubDiagrams[1].height() / 2),
                simSubDiagrams[3].absolutePosition().addY(simSubDiagrams[3].height() / 2),
            ]} {...diagramLine} startOffset={10} endOffset={10} startArrow/>
            <Line ref={makeRef(simulationLines, 0)} points={[
                simSubDiagrams[0].absolutePosition().addX(simSubDiagrams[0].width() / 2),
                simSubDiagrams[1].absolutePosition().addX(-simSubDiagrams[1].width() / 2),
            ]} {...diagramLine} startOffset={1} endOffset={1}/>
            <Line ref={makeRef(simulationLines, 1)} points={[
                simSubDiagrams[1].absolutePosition().addX(simSubDiagrams[1].width() / 2),
                simSubDiagrams[2].absolutePosition().addX(-simSubDiagrams[2].width() / 2),
            ]} {...diagramLine} startOffset={1} endOffset={1}/>
            <Line ref={simulationToAdapt} points={[
                simSubDiagrams[2].absolutePosition().addY(simSubDiagrams[2].height() / 2),
                adaptSubDiagrams[2].absolutePosition().addY(-adaptSubDiagrams[2].height() / 2),
            ]} {...diagramLine}/>
            <Line ref={makeRef(adaptToPresentation, 0)} points={[
                adaptSubDiagrams[2].absolutePosition().addY(adaptSubDiagrams[2].height() / 2),
                adaptSubDiagrams[2].absolutePosition().addY(460),
            ]} {...diagramLine} endOffset={0} endArrow={false}/>
            <Line ref={makeRef(adaptToPresentation, 1)} points={[
                adaptSubDiagrams[2].absolutePosition().addY(250),
                presentationSubDiagrams[1].absolutePosition().addX(-presentationSubDiagrams[1].width() / 2),
            ]} {...diagramLine} startOffset={0}/>
            <Line ref={makeRef(adaptToPresentation, 2)} points={[
                adaptSubDiagrams[2].absolutePosition().addY(355),
                presentationSubDiagrams[2].absolutePosition().addX(-presentationSubDiagrams[2].width() / 2),
            ]} {...diagramLine} startOffset={0}/>
            <Line ref={makeRef(adaptToPresentation, 3)} points={[
                adaptSubDiagrams[2].absolutePosition().addY(460),
                presentationSubDiagrams[3].absolutePosition().addX(-presentationSubDiagrams[3].width() / 2),
            ]} {...diagramLine} startOffset={0}/>
        </Rect>
    )
    
    yield* all(
        fromBackground().opacity(0, 1),
        toBackground().opacity(1, 1),
        topText().text('Programming', 1),
        bottomText().text('Architecture', 1),
    );
    yield* beginSlide('high-level');
    yield* all(
        topText().opacity(0, 0.5),
        topText().y(-550, 1),
        bottomText().fontSize(150, 1),
        bottomText().y(-350, 1),
        overlay().opacity(0.95, 1),
        overlay().fill(DARK, 1)
    );

    const generators = [];
    for(let i = 0; i < layers.length; i++) {
        generators.push(
            chain(
                layerOutlines[i].end(1, 1), 
                all(
                    layerNames[i].opacity(1, 1),
                    layers[i].opacity(1, 1),
                ),
            )
        );
    }
    yield* chain(...generators);
    
    yield* beginSlide('high-level details')
    yield* all(
        bottomText().opacity(0, 0.5),
        mainBoxes().y(0, 1.5),
        layers[0].width(simExtendedWidth, 1.5),
        layers[0].height(simExtendedHeight, 1.5),
        layers[0].y(simExtendedY, 1.5),
        layers[1].width(adapterExtendedWidth, 1.5),
        layers[1].height(adapterExtendedHeight, 1.5),
        layers[1].y(adapterExtendedY, 1.5),
        layers[2].width(presentationExtendedWidth, 1.5),
        layers[2].height(presentationExtendedHeight, 1.5),
        layers[2].y(presentationExtendedY, 1.5),
        all(
            ...layerNames.map(text => text.fontSize(35, 1.5)),
            layerNames[0].y(-90, 1.5),
            layerNames[1].y(-95, 1.5),
            layerNames[2].y(-145, 1.5),
        ),
    );
    
    yield* beginSlide('presentation details');
    yield* all(
        layerOutlines[0].opacity(0.3, 0.75),
        layerOutlines[1].opacity(0.3, 0.75),
        ...presentationSubDiagrams.map(text => text.opacity(1, 0.75)),
    )
    
    yield* beginSlide('adapter details');
    yield* all(
        layerOutlines[0].opacity(0.3, 0.75),
        layerOutlines[1].opacity(1, 0.75),
        layerOutlines[2].opacity(0.3, 0.75),
        ...adaptSubDiagrams.map(text => text.opacity(1, 0.75)),
        ...presentationSubDiagrams.map(text => text.opacity(0.3, 0.75)),
    )

    yield* beginSlide('simulation details');
    yield* all(
        layerOutlines[0].opacity(1, 0.75),
        layerOutlines[1].opacity(0.3, 0.75),
        layerOutlines[2].opacity(0.3, 0.75),
        ...simSubDiagrams.map(text => text.opacity(1, 0.75)),
        ...adaptSubDiagrams.map(text => text.opacity(0.3, 0.75)),
    );
    
    yield* beginSlide('presentation to adapter');
    yield* all(
        layerOutlines[0].opacity(1, 0.75),
        layerOutlines[1].opacity(1, 0.75),
        layerOutlines[2].opacity(1, 0.75),
        ...simSubDiagrams.map(text => text.opacity(1, 0.75)),
        ...adaptSubDiagrams.map(text => text.opacity(1, 0.75)),
        ...presentationSubDiagrams.map(text => text.opacity(1, 0.75)),
    );
    yield* presentationToAdaptLines[0].end(1, 1);
    
    yield* beginSlide('adapter to simulation (command)');
    yield* all(
        presentationToAdaptLines[0].opacity(0.3, 1),
        adaptToSimulationLines[0].end(1, 1),
    );
    
    yield* beginSlide('adapter to simulation (data)');
    yield* adaptToSimulationLines[1].end(1, 1);
    
    yield* beginSlide('simulation stream');
    yield* all(
        adaptToSimulationLines[0].opacity(0.3, 1),
        adaptToSimulationLines[1].opacity(0.3, 1),
        chain(
            simulationLines[0].end(1, 0.5, easeInExpo),
            simulationLines[1].end(1, 0.5, easeOutExpo),
        )
    );
    
    yield* beginSlide('simulation to adapter');
    yield* all(
        simulationLines[0].opacity(0.3, 1),
        simulationLines[1].opacity(0.3, 1),
        simulationToAdapt().end(1, 1),
    );
    
    yield* beginSlide('adapter to presentation');
    yield* all(
        simulationToAdapt().opacity(0.3, 1),
        adaptToPresentation[0].end(1, 1, easeInExpo),
        delay(0.875, adaptToPresentation[1].end(1, 1, easeOutExpo)),
        delay(0.95, adaptToPresentation[2].end(1, 1, easeOutExpo)),
        delay(1, adaptToPresentation[3].end(1, 1, easeOutExpo))
    );
    
    yield* beginSlide('full view');
    yield* all(
        ...presentationToAdaptLines.map(line => line.opacity(1, 1)),
        ...adaptToSimulationLines.map(line => line.opacity(1, 1)),
        ...simulationLines.map(line => line.opacity(1, 1)),
        simulationToAdapt().opacity(1, 1),
    );
});