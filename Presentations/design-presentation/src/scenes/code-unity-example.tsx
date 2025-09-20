import {Line, makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {Spline} from '@motion-canvas/2d/lib/components';
import {
    all,
    beginSlide,
    chain,
    createRef,
    fadeTransition,
    makeRef,
    sequence,
    useScene,
    Vector2
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const systems: Rect[] = [];
    const systemConnections: Line[] = [];
    const steps: Txt[] = [];
    const directions: Line[] = [];

    const DARK = useScene().variables.get('dark', '#1c1c1c');
    const LIGHT = useScene().variables.get('light', '#eeeeee');
    const VERDIGRIS = useScene().variables.get('verdigris', '#43b3ae');
    const PINK = useScene().variables.get('pink', '#ec008c');

    const headerProps = {
        fontFamily: 'Bokor',
        fontStyle: 'normal',
        fontSize: 150,
        leftEdgeColor: VERDIGRIS,
        rightEdgeColor: PINK,
        edgeOffset: 2
    }

    const bodyText = {
        fontFamily: 'Geo',
        fontWeight: 400,
        fontSize: 30,
        fill: LIGHT,
        opacity: 1,
    }

    const outlineBox = {
        stroke: LIGHT,
        lineWidth: 2,
        fill: DARK,
        opacity: 0,
        width: 150,
        height: 75,
    }
    
    const diagramLine = {
        stroke: LIGHT,
        opacity: 0,
        lineWidth: 2,
        end: 0,
    }
    
    const stepsText = {
        fontFamily: 'JetBrains Mono',
        fontWeight: 400,
        fontSize: 17.5,
        fill: LIGHT,
        opacity: 0,
    }
    
    const directionLine = {
        stroke: PINK,
        opacity: 1,
        lineWidth: 3,
        end: 0,
        endArrow: true,
        arrowSize: 10,
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'}>
            <Rect width={'100%'} height={'100%'} fill={DARK}/>
            <Rect ref={makeRef(systems, 0)} {...outlineBox} y={-350} x={-750}>
                <Txt text={'Card UI'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 1)} {...outlineBox} y={-350} x={-550}>
                <Txt text={'Input'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 2)} {...outlineBox} width={230} y={-350} x={-300}>
                <Txt text={'Command Router'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 3)} {...outlineBox} width={210} y={-350} x={-30}>
                <Txt text={'Battle Director'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 4)} {...outlineBox} width={190} y={-350} x={225}>
                <Txt text={'ContentDB'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 5)} {...outlineBox} width={190} y={-350} x={480}>
                <Txt text={'Dispatcher'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 6)} {...outlineBox} width={190} y={-350} x={725}>
                <Txt text={'UI/VFX/Audio'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 7)} {...outlineBox} y={350} x={-750}>
                <Txt text={'Card UI'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 8)} {...outlineBox} y={350} x={-550}>
                <Txt text={'Input'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 9)} {...outlineBox} width={230} y={350} x={-300}>
                <Txt text={'Command Router'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 10)} {...outlineBox} width={210} y={350} x={-30}>
                <Txt text={'Battle Director'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 11)} {...outlineBox} width={190} y={350} x={225}>
                <Txt text={'ContentDB'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 12)} {...outlineBox} width={190} y={350} x={480}>
                <Txt text={'Dispatcher'} {...bodyText}/>
            </Rect>
            <Rect ref={makeRef(systems, 13)} {...outlineBox} width={190} y={350} x={725}>
                <Txt text={'UI/VFX/Audio'} {...bodyText}/>
            </Rect>
            
            <Line ref={makeRef(systemConnections, 0)} {...diagramLine} points={[
                systems[0].absolutePosition().addY(systems[0].height() / 2),
                systems[7].absolutePosition().addY(-systems[7].height() / 2),
            ]}/>
            <Line ref={makeRef(systemConnections, 1)} {...diagramLine} points={[
                systems[1].absolutePosition().addY(systems[1].height() / 2),
                systems[8].absolutePosition().addY(-systems[8].height() / 2),
            ]}/>
            <Line ref={makeRef(systemConnections, 2)} {...diagramLine} points={[
                systems[2].absolutePosition().addY(systems[2].height() / 2),
                systems[9].absolutePosition().addY(-systems[9].height() / 2),
            ]}/>
            <Line ref={makeRef(systemConnections, 3)} {...diagramLine} points={[
                systems[3].absolutePosition().addY(systems[3].height() / 2),
                systems[10].absolutePosition().addY(-systems[10].height() / 2),
            ]}/>
            <Line ref={makeRef(systemConnections, 4)} {...diagramLine} points={[
                systems[4].absolutePosition().addY(systems[4].height() / 2),
                systems[11].absolutePosition().addY(-systems[11].height() / 2),
            ]}/>
            <Line ref={makeRef(systemConnections, 5)} {...diagramLine} points={[
                systems[5].absolutePosition().addY(systems[5].height() / 2),
                systems[12].absolutePosition().addY(-systems[12].height() / 2),
            ]}/>
            <Line ref={makeRef(systemConnections, 6)} {...diagramLine} points={[
                systems[6].absolutePosition().addY(systems[6].height() / 2),
                systems[13].absolutePosition().addY(-systems[13].height() / 2),
            ]}/>
            
            <Line ref={makeRef(directions, 0)} {...directionLine} points={[
                systems[0].absolutePosition().addY(130),
                systems[1].absolutePosition().addY(130),
            ]}/>
            <Txt ref={makeRef(steps, 0)}
                 {...stepsText}
                 x={(systems[0].absolutePosition().x + systems[1].absolutePosition().x) / 2} 
                 y={systems[0].absolutePosition().y + 110}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 1)} {...directionLine} points={[
                systems[1].absolutePosition().addY(160),
                systems[2].absolutePosition().addY(160)]} lineDash={[5, 5]}
            />
            <Txt ref={makeRef(steps, 1)}
                 {...stepsText}
                 x={(systems[1].absolutePosition().x + systems[2].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 140}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 2)} {...directionLine} points={[
                systems[2].absolutePosition().addY(190),
                systems[3].absolutePosition().addY(190)]}
            />
            <Txt ref={makeRef(steps, 2)}
                 {...stepsText}
                 x={(systems[2].absolutePosition().x + systems[3].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 170}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 3)} {...directionLine} points={[
                systems[3].absolutePosition().addY(220),
                systems[4].absolutePosition().addY(220)]}
            />
            <Txt ref={makeRef(steps, 3)}
                 {...stepsText}
                 x={(systems[3].absolutePosition().x + systems[4].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 200}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 4)} {...directionLine} points={[
                systems[4].absolutePosition().addY(280),
                systems[3].absolutePosition().addY(280)]}
                lineDash={[5, 5]}
            />
            <Txt ref={makeRef(steps, 4)}
                 {...stepsText}
                 x={(systems[3].absolutePosition().x + systems[4].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 260}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 5)} {...directionLine} points={[
                    systems[3].absolutePosition().addY(370),
                    systems[3].absolutePosition().addY(395).addX(300),
                    systems[3].absolutePosition().addY(420),
                  ]}
                  radius={25}
                  lineDash={[5, 5]}
            />
            <Txt ref={makeRef(steps, 5)}
                 {...stepsText}
                 x={systems[3].absolutePosition().x}
                 y={systems[0].absolutePosition().y + 340}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 6)} {...directionLine} points={[
                systems[3].absolutePosition().addY(460),
                systems[2].absolutePosition().addY(460),
            ]}
                  lineDash={[5, 5]}
            />
            <Txt ref={makeRef(steps, 6)}
                 {...stepsText}
                 x={(systems[3].absolutePosition().x + systems[2].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 440}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 7)} {...directionLine} points={[
                systems[2].absolutePosition().addY(510),
                systems[5].absolutePosition().addY(510),
            ]}/>
            <Txt ref={makeRef(steps, 7)}
                 {...stepsText}
                 x={(systems[3].absolutePosition().x + systems[2].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 490}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 8)} {...directionLine} points={[
                systems[5].absolutePosition().addY(570),
                systems[6].absolutePosition().addY(570),
            ]}/>
            <Txt ref={makeRef(steps, 8)}
                 {...stepsText}
                 x={(systems[5].absolutePosition().x + systems[6].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 550}
                 text={'0'}
            />

            <Line ref={makeRef(directions, 9)} {...directionLine} points={[
                systems[6].absolutePosition().addY(615),
                systems[0].absolutePosition().addY(615),
            ]}/>
            <Txt ref={makeRef(steps, 9)}
                 {...stepsText}
                 x={(systems[6].absolutePosition().x + systems[0].absolutePosition().x) / 2}
                 y={systems[0].absolutePosition().y + 595}
                 text={'0'}
            />
        </Rect>
    )

    yield* fadeTransition(1);
    const generators = [];
    for(let i = 0; i < systemConnections.length; i++) {
        generators.push(all(systemConnections[i].end(1, 1), systemConnections[i].opacity(0.6, 1)));
    }
    
    yield* all(
        ...systems.map(box => box.opacity(1, 1)),
        sequence(
            0.1,
            ...generators
        )
    )
    
    yield* beginSlide('step one');
    yield* all(
        directions[0].end(1, 1),
        steps[0].text('DragDrop(Card)', 1),
        steps[0].opacity(1, 1),
    )

    yield* beginSlide('step two');
    yield* all(
        directions[1].end(1, 1),
        steps[1].text('Create PlayCard(ID)', 1),
        steps[1].opacity(1, 1),
    )

    yield* beginSlide('step three');
    yield* all(
        directions[2].end(1, 1),
        steps[2].text('Handle(PlayCard)', 1),
        steps[2].opacity(1, 1),
    )

    yield* beginSlide('step four');
    yield* all(
        directions[3].end(1, 1),
        steps[3].text('Lookup(PlayCard)', 1),
        steps[3].opacity(1, 1),
    )

    yield* beginSlide('step five');
    yield* all(
        directions[4].end(1, 1),
        steps[4].text('Card Data', 1),
        steps[4].opacity(1, 1),
    )

    yield* beginSlide('step six');
    yield* all(
        directions[5].end(1, 1),
        steps[5].text('Resolve Simulation', 1),
        steps[5].opacity(1, 1),
    )

    yield* beginSlide('step seven');
    yield* all(
        directions[6].end(1, 1),
        steps[6].text('Send Results', 1),
        steps[6].opacity(1, 1),
    )

    yield* beginSlide('step eight');
    yield* all(
        directions[7].end(1, 1),
        steps[7].text('Dispatch Results', 1),
        steps[7].opacity(1, 1),
    )

    yield* beginSlide('step nine');
    yield* all(
        directions[8].end(1, 1),
        steps[8].text('Update UI, VFX, Audio', 1),
        steps[8].opacity(1, 1),
    )

    yield* beginSlide('step ten');
    yield* all(
        directions[9].end(1, 1),
        steps[9].text('Update hand, health bars, SFX/VFX, etc.', 1),
        steps[9].opacity(1, 1),
    )
    
    yield* beginSlide('end')
});