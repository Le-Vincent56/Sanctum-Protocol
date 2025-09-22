import {makeScene2D, Rect, Img, Circle, Line, Txt} from "@motion-canvas/2d";
import {
    all,
    beginSlide, chain,
    createRef, delay, easeInExpo, easeOutBack, easeOutExpo, makeRef,
    useScene,
    Vector2
} from "@motion-canvas/core";
import {EdgeStrokeTxt} from "../types/EdgeStrokeTxt";
import {circleTransition} from "../transitions/customTransitions";
import background from "../img/programming-background.jpg";

export default makeScene2D(function* (view) {
    const wrapper = createRef<Rect>();
    const topText = createRef<EdgeStrokeTxt>();
    const bottomText = createRef<EdgeStrokeTxt>();
    const backgroundImg = createRef<Img>();
    const overlay = createRef<Rect>();
    
    const branches: Line[] = [];
    const startPoints: Circle[] = [];
    const endPoints: Circle[] = [];
    const labels: Txt[] = [];
    const connectors: Line[] = [];
    const midPoints: Circle[] = [];
    
    const pointSize = 25;
    
    const FIRST_POSITION = -250;
    const SECOND_POSITION = FIRST_POSITION + 150;
    const THIRD_POSITION = SECOND_POSITION + 150;
    const FOURTH_POSITION = THIRD_POSITION + 150;
    const FIFTH_POSITION = FOURTH_POSITION + 150;

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
        fontSize: 70,
        fill: LIGHT,
        opacity: 0,
    }

    const branchLine = {
        stroke: LIGHT,
        lineWidth: 6,
        end: 0,
    }
    
    const connectorLine = {
        stroke: LIGHT,
        lineWidth: 3,
        end: 0,
        lineDash: [15, 30],
    }
    
    const point = {
        size: 0,
        fill: LIGHT
    }

    view.add(
        <Rect ref={wrapper} width={'100%'} height={'100%'} fill={DARK}>
            <Img ref={backgroundImg} src={background}  rotation={-30} x={-100} opacity={0.4}/>
            <Rect ref={overlay} width={'100%'} height={'100%'} fill={'#000000'} opacity={0.5}/>
            <Rect width={'80%'} height={'40%'} y={-50}>
                <EdgeStrokeTxt ref={topText} text={'Programming'} fill={'white'} y={-100} {...headerProps}/>
                <EdgeStrokeTxt ref={bottomText} text={'Architecture'} fill={'white'} y={100} {...headerProps}/>
            </Rect>

            <Txt ref={makeRef(labels, 0)} {...bodyText} text={'MAIN'} x={-775} y={FIRST_POSITION}/>
            <Circle ref={makeRef(startPoints, 0)} {...point} x={-600} y={FIRST_POSITION}/>
            <Circle ref={makeRef(endPoints, 0)} {...point} x={700} y={FIRST_POSITION}/>
            <Line ref={makeRef(branches, 0)} points={() => [
                startPoints[0].position(),
                endPoints[0].position()
                ]} {...branchLine}
            />

            <Txt ref={makeRef(labels, 1)} {...bodyText} text={'RELEASE'} x={-730} y={SECOND_POSITION}/>
            <Circle ref={makeRef(startPoints, 1)} {...point} x={100} y={SECOND_POSITION}/>
            <Circle ref={makeRef(endPoints, 1)} {...point} x={700} y={SECOND_POSITION}/>
            <Circle ref={makeRef(midPoints, 0)} {...point} x={100} y={SECOND_POSITION}/>
            <Circle ref={makeRef(midPoints, 1)} {...point} x={400} y={SECOND_POSITION}/>
            <Line ref={makeRef(branches, 1)} points={() => [
                startPoints[1].position(),
                endPoints[1].position()
                ]} {...branchLine}
            />
            <Line ref={makeRef(branches, 5)} points={() => [
                startPoints[1].position(), 
                midPoints[0].position()
                ]} {...branchLine}
            />
            <Line ref={makeRef(branches, 6)} points={() => [
                midPoints[0].position(),
                midPoints[1].position()
            ]} {...branchLine}
            />

            <Txt ref={makeRef(labels, 2)} {...bodyText} text={'FEATURE 1'} x={-700} y={SECOND_POSITION}/>
            <Circle ref={makeRef(startPoints, 2)} {...point} x={-450} y={SECOND_POSITION}/>
            <Circle ref={makeRef(endPoints, 2)} {...point} x={-50} y={SECOND_POSITION}/>
            <Line ref={makeRef(branches, 2)} points={() => [
                startPoints[2].position(),
                endPoints[2].position()
                ]} {...branchLine}
            />

            <Txt ref={makeRef(labels, 3)} {...bodyText} text={'FEATURE 2'} x={-700} y={THIRD_POSITION}/>
            <Circle ref={makeRef(startPoints, 3)} {...point} x={-450} y={THIRD_POSITION}/>
            <Circle ref={makeRef(endPoints, 3)} {...point} x={100} y={THIRD_POSITION}/>
            <Line ref={makeRef(branches, 3)} points={() => [
                startPoints[3].position(),
                endPoints[3].position()
                ]} {...branchLine}
            />

            <Txt ref={makeRef(labels, 4)} {...bodyText} text={'DEVELOP.'} x={-725} y={THIRD_POSITION}/>
            <Circle ref={makeRef(startPoints, 4)} {...point} x={100} y={THIRD_POSITION}/>
            <Circle ref={makeRef(endPoints, 4)} {...point} x={400} y={THIRD_POSITION}/>
            <Line ref={makeRef(branches, 4)} points={() => [
                startPoints[4].position(),
                endPoints[4].position()
            ]} {...branchLine}
            />
            
            <Line ref={makeRef(connectors, 0)} points={() => [
                startPoints[0].position(),
                startPoints[2].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 1)} points={() => [
                startPoints[0].position(),
                startPoints[3].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 2)} points={() => [
                startPoints[0].position(),
                startPoints[1].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 3)} points={() => [
                endPoints[2].position(),
                startPoints[1].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 4)} points={() => [
                endPoints[3].position(),
                startPoints[1].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 5)} points={() => [
                endPoints[1].position(),
                endPoints[0].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 6)} points={() => [
                midPoints[0].position(),
                startPoints[4].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 7)} points={() => [
                endPoints[2].position(),
                startPoints[4].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 8)} points={() => [
                endPoints[3].position(),
                startPoints[4].position(),
                ]} {...connectorLine}
            />
            <Line ref={makeRef(connectors, 9)} points={() => [
                endPoints[4].position(),
                midPoints[1].position(),
            ]} {...connectorLine}
            />
        </Rect>
    )

    yield* circleTransition(1, new Vector2(useScene().getRealSize().width / 2, useScene().getRealSize().height / 2));
    yield* bottomText().text('Branching Model', 1);
    yield* beginSlide('intro');
    yield* all(
        topText().opacity(0, 1),
        topText().y(-575, 1),
        bottomText().fontSize(100, 1),
        bottomText().y(-375, 1),
        overlay().opacity(1, 1),
        overlay().fill(DARK, 1),
    )
    yield* all(
        labels[0].opacity(1, 0.5),
        startPoints[0].size(pointSize, 0.75, easeOutBack),
    )
    yield* beginSlide('features')
    yield* all(
        connectors[0].end(1, 1, easeInExpo),
        connectors[1].end(1, 1, easeInExpo),
    )
    yield* all(
        labels[2].opacity(1, 0.5),
        startPoints[2].size(pointSize, 0.75, easeOutBack),
        labels[3].opacity(1, 0.5),
        startPoints[3].size(pointSize, 0.75, easeOutBack),
        branches[2].end(1, 0.5),
        branches[3].end(1, 0.5),
        delay(
            0.25,
            all(
                endPoints[2].size(pointSize, 0.75, easeOutBack),
                endPoints[3].size(pointSize, 0.75, easeOutBack),
            )
        )
    )
    yield* beginSlide('release')
    yield* all(
        labels[2].y(THIRD_POSITION, 1),
        startPoints[2].y(THIRD_POSITION, 1),
        endPoints[2].y(THIRD_POSITION, 1),

        labels[3].y(FOURTH_POSITION, 1),
        startPoints[3].y(FOURTH_POSITION, 1),
        endPoints[3].y(FOURTH_POSITION, 1),
        
        delay(
            0.25,
            all(
                connectors[2].end(1, 1, easeInExpo),
                labels[1].opacity(1, 1),
                startPoints[1].size(pointSize, 0.75, easeOutBack),
            )
        ),
    );
    
    yield* beginSlide('integration');
    yield* all(
        connectors[3].end(1, 1),
        connectors[4].end(1, 1),
    )
    
    yield* beginSlide('work');
    yield* all(
        branches[1].end(1, 0.5),
        delay(
            0.25,
            endPoints[1].size(pointSize, 0.75, easeOutBack),
        )
    )
    yield* beginSlide('merge');
    yield* connectors[5].end(1, 1);
    yield* all(
        endPoints[0].size(pointSize, 0.75, easeOutBack),
        delay(
            0.25,
            branches[0].end(1, 0.75),
        )
    )
    
    yield* beginSlide('reset');
    yield* all(
        connectors[3].end(0, 1),
        connectors[4].end(0, 1),
        connectors[2].end(0, 1),
        startPoints[1].size(0, 0.75, easeOutBack),
        branches[1].start(1, 0.75),
        delay(
            0.25,
            all(
                endPoints[1].size(0, 1),
                connectors[5].start(1, 1),
            )
        )
    )
    branches[1].end(0);
    branches[1].start(0);
    connectors[5].end(0);
    connectors[5].start(0);
    startPoints[1].x(-300);
    yield* all(
        labels[2].y(FOURTH_POSITION, 1),
        startPoints[2].y(FOURTH_POSITION, 1),
        endPoints[2].y(FOURTH_POSITION, 1),

        labels[3].y(FIFTH_POSITION, 1),
        startPoints[3].y(FIFTH_POSITION, 1),
        endPoints[3].y(FIFTH_POSITION, 1),
        labels[4].opacity(1, 1),
    )

    yield* beginSlide('setup development');
    yield* all(
        connectors[2].end(1, 1),
        startPoints[1].size(pointSize, 0.75, easeOutBack),
        
    );
    
   yield* chain(
       all(
           labels[2].text('F', 1, easeInExpo),
           labels[3].text('F', 1, easeInExpo),
       ),
       all(
           labels[2].text('FEATURE 4', 1, easeOutExpo),
           labels[3].text('FEATURE 5', 1, easeOutExpo),
       ),
   );

    yield* beginSlide('development');
    yield* all(
        branches[5].end(1, 0.5),
        delay(
            0.25,
            midPoints[0].size(pointSize, 0.75, easeOutBack),
        )
    );
    yield* connectors[6].end(1, 1);
    yield* startPoints[4].size(pointSize, 0.75, easeOutBack);
    
    yield* beginSlide('integrate into development')
    yield* all(
        connectors[7].end(1, 1),
        connectors[8].end(1, 1),
    );
    
    yield* beginSlide('work in develop')
    yield* all(
        branches[4].end(1, 0.5),
        delay(
            0.25,
            endPoints[4].size(pointSize, 0.75, easeOutBack),
        )
    )
    
    yield* beginSlide('merge release')
    yield* connectors[9].end(1, 1);
    yield* all(
        midPoints[1].size(pointSize, 0.75, easeOutBack),
        delay(
            0.25,
            branches[6].end(1, 0.75),
        )
    )
    
    yield* beginSlide('work in release');
    yield* all(
        branches[1].end(1, 0.5),
        delay(
            0.25,
            endPoints[1].size(pointSize, 0.75, easeOutBack),
        )
    )
    
    yield* beginSlide('merge into main');
    yield* connectors[5].end(1, 1);
    
    yield* beginSlide('end');
    yield* all(
        ...branches.map(branch => branch.start(1, 1)),
        ...startPoints.map(startPoint => startPoint.size(0, 1)),
        ...endPoints.map(endPoint => endPoint.size(0, 1)),
        ...midPoints.map(midPoint => midPoint.size(0, 1)),
        ...labels.map(label => label.opacity(0, 1)),
        ...connectors.map(connector => connector.start(1, 1)),
        ...connectors.map(connector => connector.end(1, 1)),
    )
    
    yield* all(
        backgroundImg().opacity(0.4, 1),
        overlay().opacity(0.5, 1),
        topText().opacity(1, 1),
        topText().y(-100, 1),
        topText().fontSize(200, 1),
        bottomText().y(100, 1),
        bottomText().fontSize(200, 1),
    )
});