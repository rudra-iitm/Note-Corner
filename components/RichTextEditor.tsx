import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Or your desired theme CSS
import { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';

const RichTextEditor = ({setEditorContentprop,idprop,iniContent}:{setEditorContentprop: React.Dispatch<React.SetStateAction<string[]>>,idprop:number,iniContent:string}) => {
  const restEdiCon=iniContent.substring(1);  
  const [editorContent, setEditorContent] = useState(restEdiCon);
  const [prevString, setprevString] = useState('');
  const [sugString, setsugString] = useState('abcdefabcdefabcdefabcdefabcdefabcdef');

  const autoCompletion=() => {
    // url http://localhost:5959/api/v1/noteCreate/completion
    if(prevString.length<2){return;}
    axios.post('http://localhost:5959/api/v1/noteCreate/completion', {
        "message":prevString
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
    }
    useEffect(() => {
      const id=setInterval(() => {
        autoCompletion();
      }, 4000);
      return () => {
        // clearInterval(id);
      };
    }
    ,[prevString]);
    const handleEditorChange = (value: string) => {
        // console.log(value);
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
       <div className='bg-zinc-200 rounded-xl p-2 h-10 w-fit max-w-40 overflow-x-auto absolute right-4 top-[1px]'><h1 className='font-md'>Suggestion :</h1><input value={sugString} readOnly={true}/></div>
    </div>
   ) 
}

export default RichTextEditor;