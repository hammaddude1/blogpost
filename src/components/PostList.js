import React, { Component } from 'react';
import UserHeader from "./UserHeader";
import { fetchPostsAndUsers } from "../actions";
import { connect } from "react-redux";
import { Pagination, Container } from 'semantic-ui-react'

class PostList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     }
    // }

    componentDidMount() {
        this.props.fetchPostsAndUsers();
    }

    renderList = () => {

        return this.props.posts.map(post => {
            return (
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user" />
                    <div className="content">
                        <div className="descrption">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId} />
                    </div>
                </div>
            )

        })
    }

    render() {
        return (
            <div>
                <Container textAlign='center' style={{ marginTop: "10px" }}><h2> BLOGLIST</h2></Container>
                <div className="ui relaxed divided list">
                    {this.renderList()}
                </div>
                {/* <Container textAlign="center" >
                    <Pagination style={{ marginBottom: "10px" }}
                        activePage={currentPage}
                        totalPages={totalPosts}
                        onPageChange={this.handlePaginationChange}
                    />
                    {currentPage}
                </Container> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        posts: state.posts
    })
}

export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList)



