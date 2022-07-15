import 'antd/dist/antd.min.css';
import { List, Row, Col, Divider, Select, Input } from 'antd';
import { AddTodo, Todo } from '../../components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { todosSelector } from '../../saga/Todos/todos.selector';
import { useDispatch } from 'react-redux';
import { sortRequest } from '../../saga/Todos/todos.action';
import React, { useState } from 'react';
import styled from 'styled-components';
const StytedDiv = styled.div`
    margin-top: 20px;
`;
const { Option } = Select;
const TodoList = () => {
    const dispatch = useDispatch();
    const listTodo = useSelector(todosSelector);
    const [listSearch, setListSearch] = useState([]);
    const [selectChange, setSelectChange] = useState(false);

    const handleChange = (value) => {
        if (listTodo.length > 1) {
            dispatch(
                sortRequest(value, () => {
                    toast.success(`Sort By ${value} Success!!!`);
                    setSelectChange(!selectChange);
                }),
            );
        }
    };
    console.log('search', listSearch);

    const handleChangeSearch = (e) => {
        setListSearch(listTodo.filter((value) => value.title.includes(e.target.value)));
    };

    return (
        <div className="App">
            <div className="TodoList">
                <Row justify="left">
                    <Col span={24}>
                        <h1>Todo App</h1>
                    </Col>
                    <Col span={24}>
                        <AddTodo setListSearch={setListSearch} />
                    </Col>
                    <Col span={4}>
                        <StytedDiv>
                            Sort by:
                            <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                            >
                                <Option value="name">Todo</Option>
                                <Option value="completed">Completed</Option>
                            </Select>
                        </StytedDiv>
                    </Col>
                    <Col span={19}>
                        <StytedDiv>
                            Search:
                            <Input placeholder="Search" size="medium" onChange={handleChangeSearch} />
                        </StytedDiv>
                    </Col>

                    <Divider plan="true">LIST TODO</Divider>
                    <Col span={24}>
                        {
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    onChange: (page) => {
                                        console.log(page);
                                    },
                                    pageSize: 4,
                                }}
                                dataSource={listSearch.length > 0 ? listSearch : listTodo}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Todo
                                            title={item.title}
                                            id={item.id}
                                            key={item.id}
                                            complete={item.completed}
                                            setListSearch={setListSearch}
                                        />
                                    </List.Item>
                                )}
                            />
                        }
                    </Col>
                </Row>
                <ToastContainer />
            </div>
        </div>
    );
};

export default TodoList;
