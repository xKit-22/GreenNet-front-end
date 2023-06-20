import { useState } from 'react'
import { notificationService } from "../../config/notificationConfig";

import './adminPanel.scss'

export const AddMarkerType = () => {
    const [key, setKey] = useState("");
    const [name, setName] = useState("");
    const createType = (e) => {
        e.preventDefault();
        const currentTypes = JSON.parse(localStorage.getItem("savedMarkerTypes"));
        currentTypes.GLASS_RECYCLING = {
            type: key,
            localization: name,
            icon: 'bottle'
        }
        localStorage.setItem("savedMarkerTypes", JSON.stringify(currentTypes));
        notificationService.success(`Тип ${name} успешно добавлен`);
    }

    return (
        <div className='addMarker'>
            <h2>Добавить тип меток</h2>
            <div className="addMarker-item">
                <label>Ключ типа</label>
                <input type="text" onChange={(e) => setKey(e.target.value)} />
            </div>
            <div className="addMarker-item">
                <label>Название типа</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="addMarker-item">
                <label>Иконка</label>
                <input type='file' accept="image/*" multiple="false" />
            </div>
            <button onClick={(e) => createType(e)}>Создать тип</button>
        </div>
    )
}