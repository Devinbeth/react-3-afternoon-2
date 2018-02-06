import React, {Component} from 'react';
import axios from 'axios';
import ConfirmModal from './subcomponents/ConfirmModal';

// import axios


class Edit extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            subTitle:'',
            image:'',
            text:'',
            confirm: ''
        }
        this.yes = this.yes.bind(this);
        this.no = this.no.bind(this);
    }

    componentWillMount(){
        axios.get('/api/blog/' + this.props.match.params.id).then(res => {
            this.setState({
                title: res.data.title,
                subTitle: res.data.subTitle,
                image: res.data.image,
                text: res.data.text
            })
        }
        ).catch(console.log);
    }

    
    updatePost(){
        //axios.put('/api/blog/' + this.props.match.params.id).then().catch(console.log);
        let body = {
            title: this.state.title,
            subTitle: this.state.subTitle,
            image: this.state.image,
            text: this.state.text
        }
        axios.put('/api/blogs/', body).then(res => this.props.history.push(`/blog/${this.props.match.params.id}`)).catch(console.log);
    }
    

    deletePost(){
        //axios.delete('/api/blog/' + this.props.match.params.id).then().catch(console.log);
        axios.delete('api/blog/' + this.props.match.params.id).then(() => this.props.history.push('/search')).catch(console.log);
    } 

    
    render() {
        let {title, subTitle, image, text} = this.state;
        return (
            <div className='content'>
                <div className="add-blog">
                    <div className="input-group">
                        <label htmlFor="">Title</label>
                        <input value={title} onChange={e=>this.titleChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Sub-Title</label>
                        <input value={subTitle} onChange={e=>this.subTitleChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Photo Url</label>
                        <input value={image} onChange={e=>this.imageChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group text-input">
                        <label htmlFor="">Content</label>
                        <textarea value={text} onChange={e=>this.textChange(e.target.value)} placeholder="Blog here!" />
                    </div>
                    <div className="buttons">
                        <button onClick={_=>this.delete()} className='delete-button' >Delete</button>
                        <button onClick={_=>this.cancel()} className='cancel-button'>Cancel</button>
                        <button onClick={_=>this.updatePost()} >Update</button>
                    </div>
                    {
                        this.state.confirm
                        ?
                        <ConfirmModal confirm={this.state.confirm} no={this.no} yes={this.yes} />
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    yes(){
        if (this.state.confirm === 'discard'){
            this.setState({
                title: this.state.original.title,
                subTitle: this.state.original.subTitle,
                image: this.state.original.image,
                text: this.state.original.text,
                confirm: ''
            })
        }
        else{
            this.deletePost()
        }
    }
    no(){
        this.setState({
            confirm: ''
        })
    }
    delete(){
        this.setState({
            confirm: 'delete'
        })
    }
    cancel(){
        this.setState({
            confirm: 'discard'
        })
    }

    titleChange(val){
        this.setState({
            title: val
        })
    }
    subTitleChange(val){
        this.setState({
            subTitle: val
        })
    }
    imageChange(val){
        this.setState({
            image: val
        })
    }
    textChange(val){
        this.setState({
            text: val
        })
    }
}

export default Edit;