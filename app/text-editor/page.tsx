"use client"

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Or your desired theme CSS

const page = () => {
  const [editorContent, setEditorContent] = useState('');
  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strikethrough'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ],
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleEditorChange}
        modules={modules}
      />
    </div>
  );
}

export default page
