"use client"
import { useEffect} from 'react';

export default function Meta ({title, description, keywords, robots}) {
    useEffect(() =>     
    {      
        // В тексте description нужно использовать название товара из обычного заголовка
        // Длина текста description от 120 до 155 символов включая пробелы
        document.getElementsByName('description')[0].attributes[1].textContent=description;

        // Длина текста title от 40 до 60 символов включая пробелы
        document.querySelector('title').textContent = title;

        // Ключевые слова через запятую
        document.getElementsByName('keywords')[0].attributes[1].textContent=keywords;
        
        // нужна ли индексация index noindex
        document.getElementsByName('robots')[0].attributes[1].textContent=robots;
    },)
}

