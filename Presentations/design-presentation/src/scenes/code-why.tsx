import {Line, makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {all, beginSlide, chain, createRef, Direction, makeRef, slideTransition, useScene} from "@motion-canvas/core";
import {EdgeStrokeTxt} from "../types/EdgeStrokeTxt";

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const header = createRef<EdgeStrokeTxt>();
    
    const causes: Txt[] = [];
    const arrows: Line[] = [];
    const effects: Txt[] = [];
    
    const segmentedTime = 0.75;

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
        fontSize: 40,
        fill: LIGHT,
        opacity: 0,
    }
    
    const arrow = {
        stroke: VERDIGRIS,
        lineWidth: 1,
        endArrow: true,
        arrowSize: 10,
        end: 0,
    }
    
    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'}>
            <Rect width={'100%'} height={'100%'} fill={DARK}/>
            <EdgeStrokeTxt ref={header} text={'Why'} fill={'white'} {...headerProps}/>
            <Rect width={'100%'} height={'100%'} y={50}>
                <Rect y={-120} width={900} height={100}>
                    <Txt ref={makeRef(causes, 0)} {...bodyText} x={-350} textAlign={'left'}/>
                    <Txt ref={makeRef(effects, 0)} {...bodyText}  x={170} textAlign={'left'}/>
                </Rect>
                <Rect y={0} width={900} height={100}>
                    <Txt ref={makeRef(causes, 1)} {...bodyText} x={-235} textAlign={'left'}/>
                    <Txt ref={makeRef(effects, 1)} {...bodyText} x={325} textAlign={'left'}/>
                </Rect>
                <Rect y={120} width={900} height={100}>
                    <Txt ref={makeRef(causes, 2)} {...bodyText} x={-325} textAlign={'left'}/>
                    <Txt ref={makeRef(effects, 2)} {...bodyText}  x={235} textAlign={'left'}/>
                </Rect>
            </Rect>

            <Line ref={makeRef(arrows, 0)} points={[
                causes[0].absolutePosition().addX(90),
                effects[0].absolutePosition().addX(-270)
            ]} {...arrow} />
            <Line ref={makeRef(arrows, 1)} points={[
                causes[1].absolutePosition().addX(200),
                effects[1].absolutePosition().addX(-120)
            ]} {...arrow} />
            <Line ref={makeRef(arrows, 2)} points={[
                causes[2].absolutePosition().addX(115),
                effects[2].absolutePosition().addX(-210)
            ]} {...arrow} />
        </Rect>
    )

    yield* slideTransition(Direction.Right, 1);
    yield* beginSlide('why');

    yield* beginSlide('reason one')
    yield* header().y(-300, 1);
    yield* chain(
        all(
            causes[0].opacity(1, segmentedTime),
            causes[0].text("Pure C#", segmentedTime),
        ),
        arrows[0].end(1, segmentedTime),
        all(
            effects[0].opacity(1, segmentedTime),
            effects[0].text("Can Easily Produce Unit Tests", segmentedTime),
        ),
    )

    yield* beginSlide('reason two')
    yield* chain(
        all(
            causes[1].opacity(1, segmentedTime),
            causes[1].text("One Command Pipeline", segmentedTime),
        ),
        arrows[1].end(1, segmentedTime),
        all(
            effects[1].opacity(1, segmentedTime),
            effects[1].text("Easy to QA", segmentedTime),
        ),
    )

    yield* beginSlide('reason three')
    yield* chain(
        all(
            causes[2].opacity(1, segmentedTime),
            causes[2].text("Modularity", segmentedTime),
        ),
        arrows[2].end(1, segmentedTime),
        all(
            effects[2].opacity(1, segmentedTime),
            effects[2].text("Safety and Scalability", segmentedTime),
        ),
    )
});