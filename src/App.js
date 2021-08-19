import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
function Row({ data }) {
    const keys = Object.keys(data);
    return (
        <>
            {keys.map((k) => (
                <tr>
                    <td>{k}</td>
                    {data[k].map((d) => (
                        <td>{d}</td>
                    ))}
                </tr>
            ))}
        </>
    );
}

function App() {
    const [keys, setKeys] = useState([]);
    const [data, setData] = useState({});
    const [images, setImages] = useState([]);
    useEffect(() => {
        (async () => {
            const {
                data: {
                    data: { content, images },
                },
            } = await axios.get('/data/vehicles.json');
            setData(content);
            setKeys(Object.keys(content));
            setImages(images);
        })();
    }, []);

    return (
        <div className='container'>
            {keys.length ? (
                <>
                    <table className='table table-nonfluid'>
                        <tbody>
                            <tr>
                                <td></td>
                                {images.map((img, idx) => (
                                    <td key={idx}>
                                        <img
                                            src={img}
                                            className='img-thumbnail'
                                            alt='asd'
                                            style={{
                                                height: '200px',
                                            }}
                                        />
                                    </td>
                                ))}
                            </tr>
                            {keys.map((k) => (
                                <>
                                    <tr key={k}>
                                        <th colSpan={images.length + 1}>{k}</th>
                                    </tr>
                                    <Row data={data[k]} />
                                </>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <h3 className='text-center'>
                    Please wait while loading vehicle data...
                </h3>
            )}
        </div>
    );
}

export default App;
