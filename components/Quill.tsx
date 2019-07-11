import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

class Quill extends Component {
    public ReactQuill = null;

    /*
     * Quill modules to attach to editor
     * See https://quilljs.com/docs/modules/ for complete options
     */
    public modules = {
        toolbar: [
            // [{ header: '1' }, { header: '2' }, { font: [] }],
            // [{ size: [] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    public formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    public state = { editorHtml: '', theme: 'snow' }; // You can also pass a Quill Delta here
    constructor(props) {
        super(props);
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill');
        }
    }

    public handleChange = html => this.setState({ editorHtml: html });

    public render() {
        const ReactQuill = this.ReactQuill;
        const { theme } = this.state;
        const { value, placeholder, onChange } = this.props;
        if (typeof window !== 'undefined' && ReactQuill) {
            return (
                <div className="rquill">
                    <ReactQuill
                        theme={theme}
                        onChange={onChange}
                        value={value}
                        modules={this.modules}
                        formats={this.formats}
                        // bounds=".rquill"
                        placeholder={placeholder}
                    />
                </div>
            );
        }
        return <textarea value={value} />;
    }
}

/*
 * PropType validation
 */
Quill.propTypes = {
    placeholder: PropTypes.string,
};

export default Quill;
