import React, { useState, useEffect } from 'react'
import { getRandomInt } from '../general-functions'
import { Container, Row, Col, Button } from 'react-bootstrap'
// import dict from '../../node_modules/japanese-json/kana.json'
// import QuoteText from './QuoteText'
// import QuoteAuthor from './QuoteAuthor'

function getRandomDictKey(dict) {
    const keys = Object.keys(dict);
    const length = keys.length;
    return keys[Math.floor(Math.random() * length)];
}

const QuoteBox = () => {
    // const [randomInt, setRandomInt] = useState(1)
    // const [hieroglyphs, setHieroglyphs] = useState(null)
    // const [hieroglyphMeaning, setHieroglyphMeaning] = useState(null)

    const [hieroglyph, setHieroglyph] = useState(null)
    // let dict
    // let randomInt; 
    // fetch("https://kanjiapi.dev/v1/kanji/grade-1")
    //     .then(response => response.json())
    //     .then(data => {
    //         randomInt = getRandomInt(1, data.length)
    //         setHieroglyph(data[randomInt])
    //     })
    // const length = data.count + 1;
    // const randomHieroglyph = data[getRandomInt(1, length)];

    useEffect(() => {
        fetch("https://kanjiapi.dev/v1/kanji/grade-1")
            .then(response => response.json())
            .then(data => {
                const randomInt = getRandomInt(1, data.length)
                fetch("https://kanjiapi.dev/v1/kanji/" + data[randomInt])
                    .then(response => response.json())
                    .then(data => {
                        setHieroglyph(data)
                        console.log(data)
                    })
            })


        // fetch("https://kanjiapi.dev/v1/kanji/" + hieroglyph)
        // .then(response => response.json())
        // .then(data => {

    }, [])


    // useEffect(() => {

    //     fetch("https://kanjiapi.dev/v1/kanji/grade-1")
    //         .then(response => response.json())
    //         .then(data => {
    //             // const length = data.count + 1;
    //             // const randomHieroglyph = data[getRandomInt(1, length)];
    //             setHieroglyphs(data)
    //             console.log(data);
    //             setRandomInt(getRandomInt(0, data.length))

    //             fetch("https://kanjiapi.dev/v1/kanji/" + data[randomInt])
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     setHieroglyphMeaning(data)
    //                     console.log(data)
    //                 })
    //         })
    //         // .then(() => {

    //         // })    

    // }, [])

    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // fetch(proxyUrl + 'https://kanjiapi.dev/v1/kanji/grade-1')
    //     .then(response => response.json())
    //     .then(data => {
    //         const length = data.count + 1;
    //         const randomHieroglyph = data[getRandomInt(1, length)];
    //         setHieroglyph(randomHieroglyph)
    //     })



    // const firstRandom =

    return (
        // <div>123</div>
        <main id="box" className="text-center vertical-center text-white">
            <Container fluid style={{ maxWidth: "500px" }}>
                <Row>
                    <Col>
                    <article className="card">
                        <div className="card-body">
                        {/* <h1 lang="ja-jp">{dict[getRandomDictKey(dict)]["a"]["Seion"]["Hiragana"]}</h1> */}
                        <h1 lang="ja-jp" className="p-1">{hieroglyph ? hieroglyph.kanji : "Загружается..."}</h1>
                        <h2 className="p-1">{hieroglyph ? hieroglyph.heisig_en : "Загружается..."}</h2>
                        {/* <blockquote>{quotes ? quotes[randomInt].text : "Fetching random quote ..."}</blockquote>
            <div>{quotes ? quotes[randomInt].author : "Fetching random quote author ..."}</div>*/}
                        <button className="mt-5 btn btn-lg btn-secondary" onClick={() => {
                            window.location.reload()
                        }}>Новый иероглиф</button>
                        </div>
                    </article>
                    </Col>
                </Row>
            </Container>

        </main>
    )
}

export default QuoteBox