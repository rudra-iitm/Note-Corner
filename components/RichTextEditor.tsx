import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Or your desired theme CSS
import { useState } from 'react';

const RichTextEditor = () => {
    const [editorContent, setEditorContent] = useState('');
    const handleEditorChange = (value: string) => {
        setEditorContent(value);
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
         className='w-full flex-grow px-3 py-5 dark:text-white mb-0'
       />
    </>
   ) 
}

export default RichTextEditor;