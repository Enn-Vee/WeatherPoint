import React from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { setLanguage, setUnit } from '../../redux/reducers/infoSettingsReducer';
import { toggleIsMap } from '../../redux/reducers/isMapReducer';
import { Button } from '@material-ui/core'
import './Footer.css'

function Footer() {
    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleLanguangeChange = (lang:string) => {
        dispatch(setLanguage(lang));
    }

    return (
        <div id="footer" className="d-flex justify-content-between" >
            <div>
                <ul>
                    <li className="footer-item" >
                        <Button onClick={(e) => {
                            e.preventDefault()
                            dispatch(setUnit('standard'))
                        }}><span className="button-text">Standard</span></Button>
                    </li>
                    <li className="footer-item">
                        <Button onClick={(e) => {
                            e.preventDefault()
                            dispatch(setUnit('metric'))
                        }}><span className="button-text">Metric</span></Button>
                    </li>
                    <li className="footer-item">
                        <Button onClick={(e) => {
                            e.preventDefault()
                            dispatch(setUnit('imperial'))
                        }}><span className="button-text">Imperial</span></Button>
                    </li>
                </ul>
            </div>
            <div className="footer-item">
                <Button id="map-toggler" onClick={(e) => {
                    e.preventDefault()
                    dispatch(toggleIsMap())
                }}><span className="button-text">To Map</span></Button>
            </div>
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
