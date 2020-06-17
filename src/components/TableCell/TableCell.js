import React, {useState, useEffect, useRef} from 'react';

const TableCell = (props) => {
    const field = props.dataCell.field;
    const node = useRef(null);
    const [data, setData] = useState(props.dataCell.data[field]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isValidData, setIsValidData] = useState(data.length > 0);

    const handleChange = (e, field) => {
        if(data instanceof Object){
            // Object.keys(data).map(key => {
            //     if(key === field){
            //         console.log(e.target.value)
            //     }
            // })
        } else {
            setData(e.target.value);
        }
        setIsValidData(e.target.value.length > 0);
    }

    const onSaveData = (e) => {
        props.saveData(data);
        setIsEditMode(false);
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setIsEditMode(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={el => node.current = el}>
            {
                isEditMode ?
                    <>
                        {(data instanceof Object) ?
                            Object.keys(data).map(key =>
                                <input key={key} value={data[key]} onChange={(e) => handleChange(e, key)}/>
                            )
                            :
                            <input value={data} onChange={(e) => handleChange(e, field)}/>
                        }
                        <button onClick={onSaveData} disabled={!isValidData}>Update</button>
                        <button onClick={() => setIsEditMode(false)}>Close</button>
                    </>
                    :
                    <div onDoubleClick={() => setIsEditMode(true)}>
                        {
                            (field === "id" || field === "name" || field === "username" || field === "email" || field === "phone") &&
                            data
                        }
                        {
                            (field === "website") &&
                            <a href={'http://' + data} target="_blank">{data}</a>
                        }
                        {
                            (field === "company") &&
                            data['name'] + ' ' + data['catchPhrase'] + ' ' + data['bs']
                        }
                        {
                            (field === "address") &&
                                data['street'] + ' '
                                + data['suite'] + ', '
                                + data['city'] + ' '
                                + data['zipcode'] + ' '
                                + 'Geo: ' + data['geo']['lat']  + ' ' + data['geo']['lng']
                        }
                    </div>
            }
        </div>
    );
};

export default TableCell;