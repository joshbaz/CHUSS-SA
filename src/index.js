import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'


//import ChakraProvider
import { ChakraProvider } from '@chakra-ui/react'

//imports for redux
import { Provider } from 'react-redux'
import { store } from './store/store'

//PDF Viewer worker
import { Worker } from '@react-pdf-viewer/core'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
     <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
     </Worker>
   
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

