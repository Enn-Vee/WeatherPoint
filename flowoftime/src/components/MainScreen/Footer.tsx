import React, { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setLanguage, setUnit } from '../../redux/reducers/infoSettingsReducer';
import './Footer.css'

function Footer() {

    const { timezone, unit, locale, language } = useAppSelector(state => state.infoSettings)
    const dispatch = useAppDispatch();

    const handleLanguangeChange = (lang:string) => {
        dispatch(setLanguage(lang));
    }

    return (
        <div id="footer" className="w-100" >
            <ul style={{listStyle:"none", padding:0, margin: "0", height:"100%"}}>
                <li >
                    <button onClick={(e) => {
                        e.preventDefault()
                        dispatch(setUnit('standard'))
                    }}>Standard</button>
                </li>
                <li>
                    <button onClick={(e) => {
                        e.preventDefault()
                        dispatch(setUnit('metric'))
                    }}>Metric</button>
                </li>
                <li>
                    <button onClick={(e) => {
                        e.preventDefault()
                        dispatch(setUnit('imperial'))
                    }}>Imperial</button>
                </li>
            </ul>  
            {/*<div style={{display:"none"}}>
                <select>
                    <option value="af">Afrikaans</option>
                    <option value="al">Albanian</option>
                    <option value="ar">Arabic</option>
                    <option value="az">Azerbaijani</option>
                    <option value="eu">Basque</option>
                    <option value="bg">Bulgarian</option>
                    <option value="ca">Catalan</option>
                    <option value="zh_tw">Chinese Traditional</option>
                    <option value="zh_cn">Chinese Simplified</option>
                    <option value="hr">Croatian</option>
                    <option value="cz">Czech</option>
                    <option value="da">Danish</option>
                    <option value="nl">Dutch</option>
                    <option value="en">English</option>
                    <option value="fa">Farsi</option>
                    <option value="fi">Finnish</option>
                    <option value="fr">French</option>
                    <option value="gl">Galician</option>
                    <option value="dd">German</option>
                    <option value="el">Greek</option>
                    <option value="he">Hebrew</option>
                    <option value="hi">Hindi</option>
                    <option value="hu">Hungarian</option>
                    <option value="id">Indonesian</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="kr">Korean</option>
                    <option value="la">Latvian</option>
                    <option value="lt">Lithuanian</option>
                    <option value="mk">Macedonian</option>
                    <option value="no">Norwegian</option>
                    <option value="pl">Polish</option>
                    <option value="pt">Portuguese</option>
                    <option value="pt_br">Português Brasil</option>
                    <option value="ro">Romanian</option>
                    <option value="ru">Russian</option>
                    <option value="sr">Serbian</option>
                    <option value="sk">Slovak</option>
                    <option value="sl"> Slovenian</option>
                    <option value="sp">Spanish</option>
                    <option value="sv">Swedish</option>
                    <option value="th">Thai</option>
                    <option value="tr">Turkish</option>
                    <option value="ua">Ukrainian</option>
                    <option value="vi">Vietnamese</option>
                    <option value="zu">Zulu</option>
                </select>        

                </div>*/}
        </div>
    )
}

export default Footer
