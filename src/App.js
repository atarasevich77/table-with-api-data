import React, {useEffect, useState} from 'react';
import api from './api/conf';
import './App.css';
import TableCell from "./components/TableCell/TableCell";

const titles = [
    {title: '#', field: 'id'},
    {title: 'Name', field: 'name'},
    {title: 'User Name', field: 'username'},
    {title: 'Email', field: 'email'},
    {title: 'Address', field: 'address'},
    {title: 'Phone', field: 'phone'},
    {title: 'Website', field: 'website'},
    {title: 'Company', field: 'company'}
]

function App() {
    const [data, setData] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    // start a function (addEventListener) from useEffect hook after rendering
    // https://ru.reactjs.org/docs/hooks-reference.html#useeffect
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        getData();
    }, [isFetching]);

    function handleScroll() {
        //innerHeight - Height of window screen in pixels
        const innerHeight = window.innerHeight
        // scrollTop - set of px scrolling from top to bottom a DOM element
        const scrollTop = document.documentElement.scrollTop;

        //offsetHeight - height of a DOM element
        const offsetHeight = document.documentElement.scrollHeight

        //not near bottom
        if (Math.round(innerHeight + scrollTop) <= (offsetHeight - 100)) return;

        setIsFetching(true);
    }

    const saveData = (dataCell) => {
        const updatedData = data.map(el => {
            if(el.id === dataCell.id){
                return {...el, dataCell};
            } else {
                return el;
            }
        });
        setData(updatedData);
    }

    const getData = () => {
        setIsFetching(true);
        api.get('/users')
            .then(response => {
                setData([...data, ...response.data]);
                setIsLoadingData(false);
                setIsFetching(false);
            })
            .catch(errors => {
                console.log(errors);
            });
    }

    //initialize data after open page
    useEffect(() => {
        if(data.length === 0){
            setIsLoadingData(true);
            getData();
        }
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <h1 className="p-3">Users</h1>
            </div>
            <div>
                {isLoadingData ?
                    <div className="p-2 text-center">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {
                                    titles.map((el, index) =>
                                        <th key={index} scope="col">{el.title}</th>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((obj, idx) =>
                                    <tr key={idx}>
                                        {
                                            titles.map(title =>
                                                <td key={title.field}>
                                                    <TableCell dataCell={{field: title.field, data: obj}} saveData={saveData}/>
                                                </td>
                                            )
                                        }

                                        {/*<td>{obj.id}</td>*/}
                                        {/*<td><TableCell dataCell={{field: 'name', data: obj}} saveData={saveData}/></td>*/}
                                        {/*<td><TableCell dataCell={{field: 'username', data: obj}} saveData={saveData}/></td>*/}
                                        {/*<td><TableCell dataCell={{field: 'email', data: obj}} saveData={saveData}/></td>*/}
                                        {/*<td>*/}
                                        {/*    {*/}
                                        {/*        obj.address['street'] + ' ' +*/}
                                        {/*        obj.address['suite'] + ' ' +*/}
                                        {/*        obj.address['city'] + ' ' +*/}
                                        {/*        obj.address['zipcode']*/}
                                        {/*    }*/}
                                        {/*    <div>geo:*/}
                                        {/*        {*/}
                                        {/*            obj.address['geo']['lat']  + ' ' +*/}
                                        {/*            obj.address['geo']['lng']*/}
                                        {/*        }*/}
                                        {/*    </div>*/}
                                        {/*</td>*/}
                                        {/*<td><TableCell dataCell={{field: 'phone', data: obj}} saveData={saveData}/></td>*/}
                                        {/*<td><TableCell dataCell={{field: 'website', data: obj}} saveData={saveData}/></td>*/}
                                        {/*<td>*/}
                                        {/*    {obj.company['name'] + ' ' + obj.company['catchPhrase'] + ' ' + obj.company['bs']}*/}
                                        {/*</td>*/}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default App;
