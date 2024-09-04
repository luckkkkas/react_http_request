import { useEffect, useState } from "react";


export const useFetch = (url: string) => {
    const [data, setData] = useState('');
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);
    const [itemId, setItemId] = useState(null);

    const httpConfig = (data, method:string)=>{
        if(method === 'POST'){
            setConfig({
                method,
                headres: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            setMethod(method);
        }else if(method === "DELETE"){
            setConfig({
                method,
                headres: {
                    "Content-type": "application/json"
                },
            });
            setItemId(data);
            setMethod(method);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();

            setData(data);
        }
        fetchData();
    }, [url, callFetch])

    //post
    useEffect(() => {
        const httpRequest = async () => {
            let json;
            if (method === 'POST') {
                let fetchOptions = [url, config];

                const res = await fetch(...fetchOptions);

                json = await res.json();
            }else if(method === "DELETE"){
                const deleteURL = `${url}/${itemId}`
                const res = await fetch(deleteURL, config);
                json = await res.json();
            }
            setCallFetch(json);
        }
        httpRequest();
    }, [config, method, url])




    return {data, httpConfig};
}