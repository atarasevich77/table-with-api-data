import React, {useState, useEffect, useRef} from 'react';

const TableCell = (props) => {
    const field = props.dataCell.field;
    const data = props.dataCell.data;
    const node = useRef(null);
    const [dataValue, setDataValue] = useState(data[field]);

    const [innerDataValue, setInnerDataValue] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);
    const [isValidData, setIsValidData] = useState(dataValue.length > 0);

    const handleChange = (e) => {
        setDataValue(e.target.value);
        setIsValidData(e.target.value.length > 0);
    }

    const handleChangeMultipleFields = (e, field) => {
        //TODO: need fixK
        setInnerDataValue(e.target.value);
        console.log(innerDataValue)
        // setIsValidData(e.target.value.length > 0);
    }

    const onSaveData = () => {
        data[field] = dataValue;
        props.saveData(data);
        setIsEditMode(false);
    }

    const onClose = () => {
        setDataValue(data[field]);
        setIsEditMode(false);
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        onClose();
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [data]);

    return (
        <div ref={el => node.current = el}>
            {
                isEditMode ?
                    <>
                        {(dataValue instanceof Object) ?
                            Object.keys(dataValue).map((key, idx) =>
                                    <input key={idx} value={dataValue[key]} onChange={
                                        (e) => handleChangeMultipleFields(e, key)
                                    }/>
                                 )
                            :
                            <input value={dataValue} onChange={handleChange}/>
                        }
                        <button onClick={onSaveData} disabled={!isValidData}>Update</button>
                        <button onClick={onClose}>Close</button>
                    </>
                    :
                    <div onDoubleClick={() => setIsEditMode(true)}>
                        {
                            (field === "id" || field === "name" || field === "username" || field === "email" || field === "phone") &&
                            dataValue
                        }
                        {
                            (field === "website") &&
                            <a href={'http://' + dataValue} target="_blank">{dataValue}</a>
                        }
                        {
                            (field === "company") &&
                            dataValue['name'] + ' ' + dataValue['catchPhrase'] + ' ' + dataValue['bs']
                        }
                        {
                            (field === "address") &&
                                dataValue['street'] + ' '
                                + dataValue['suite'] + ', '
                                + dataValue['city'] + ' '
                                + dataValue['zipcode'] + ' '
                                + 'Geo: ' + dataValue['geo']['lat']  + ' ' + dataValue['geo']['lng']
                        }
                    </div>
            }
        </div>
    );
};

export default TableCell;