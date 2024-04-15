import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Or your desired theme CSS
import { useState } from 'react';

const RichTextEditor = ({setEditorContentprop,idprop}:{setEditorContentprop: React.Dispatch<React.SetStateAction<string[]>>,idprop:number}) => {
    const [editorContent, setEditorContent] = useState('');
    const handleEditorChange = (value: string) => {
        setEditorContent(value);
        setEditorContentprop((prevContent) => {
          const updatedContent = [...prevContent];
          updatedContent[idprop] = value;
          return updatedContent;
        });
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
   return (
   <>
     <ReactQuill
         theme="snow"
         value={editorContent}
         onChange={handleEditorChange}
         modules={modules}
         placeholder='Write something...'
         className='w-full flex-grow px-3 dark:text-white mb-0 mt-0'
       />
    </>
   ) 
}

export default RichTextEditor;