import React from 'react'
import { useEffect } from 'react';

const UseFetch = (url,callback) => {
    useEffect(() => {
        try {
          fetch(url)
            .then((response) => response.json())
            .then((data) => callback(data));
        } catch (error) {
          console.log('error', error);
        }
      }, [url]);
}

export default UseFetch

















