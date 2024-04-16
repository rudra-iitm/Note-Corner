import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Or your desired theme CSS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';
import e from 'cors';

const RichTextEditor = ({setEditorContentprop,idprop,iniContent}:{setEditorContentprop: React.Dispatch<React.SetStateAction<string[]>>,idprop:number,iniContent:string}) => {
  const restEdiCon=iniContent.substring(1);  
  const [editorContent, setEditorContent] = useState(restEdiCon);
  const [prevString, setprevString] = useState('');
  const [sugString, setsugString] = useState('');

  // const autoCompletion=async() => {
  //   // url http://localhost:5959/api/v1/noteCreate/completion
  //   console.log(prevString);
  //   if(prevString.length<4){return;}
  //   console.log(124);
  //   await axios.post('http://localhost:5959/api/v1/noteCreate/completion', {
  //       "message":prevString
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // console.log(error);
  //     });
  //   }
    // setInterval(() => {
    //   console.log(100);
    //   console.log(prevString);
    //   console.log(editorContent);
    //   if(prevString.length>4)
    //   {
    //     axios.post('http://localhost:5959/api/v1/noteCreate/completion', {
    //     "message":prevString
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }
    //   // autoCompletion();
    // }, 5000);
    useEffect(() => {
      const id=setTimeout(() => {
        console.log(100);
        console.log(prevString);
        console.log(editorContent);
        if(prevString.length>4)
        {
          axios.post('http://localhost:5959/api/v1/noteCreate/completion', {
          "message":prevString
          })
          .then(function (response) {
            setsugString(response.data)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        // autoCompletion();
      }, 2000);
      return () => {
        clearTimeout(id);
      };
    }
    ,[prevString]);
    const handleEditorChange = (value: string) => {
        console.log(value);
        setprevString(value);
        setEditorContent(value);
        // setTimeout(() => {
        //   autoCompletion();
        // }, 4000);
        // autoCompletion();
        if(value.length>100)
          {
            setprevString(value.substring(value.length-100,value.length));
          }
          else{
            setprevString(value);
          }
        // setEditorContent(() => {
        //   const updatedContent = '2'+value;
        //   return updatedContent;
        // });
        setEditorContentprop((prevContent) => {
          const updatedContent = [...prevContent];
          updatedContent[idprop] = '2'+value;
          // console.log(updatedContent);
          return updatedContent;
        });
        
        // console.log(editorContentProp);
      };
      const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video', 'code-block', 'formula'],
            ['clean'],
            ['code-block'],
        ],
        
      };
      // console.log(editorContentProp,idprop);
   return (
   <div className='relative'>
     <ReactQuill
         theme="snow"
         value={editorContent}
         onChange={handleEditorChange}
         modules={modules}
         placeholder='Write something...'
         className='w-full flex-grow px-3 dark:text-white mb-0 mt-0'
       />
       <div className='bg-zinc-400 rounded-xl p-2 h-10 w-40 pr-4 max-w-40 absolute right-36 top-[1px] flex flex-row items-center space-x-2'><h1 className='font-md'>Suggestion: </h1><input value={sugString} readOnly={true} className='h-10 w-32 border-2 border-zinc-600'/></div>
    </div>
   ) 
}

export default RichTextEditor;