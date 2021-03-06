import React from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, CheckOutlined, LogoutOutlined } from '@ant-design/icons';
import { Checkbox, Button, Tooltip, Input, Row, Col, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRequest, updateRequest, completedRequest } from '../../saga/Todos/todos.action';
import { todosSelector } from '../../saga/Todos/todos.selector';
import todoHooks from './todo.hooks';
import { toast } from 'react-toastify';
const StytedDiv = styled.button`
    padding-left: 10px;
    border: 0;
    background-color: rgba(0, 0, 0, 0);
`;
export default function Todo(props) {
    const dispatch = useDispatch();
    const { title, id, complete, setListSearch } = props;
    const { showEdit, setShowEdit, todo, setTodo } = todoHooks();
    const listTodo = useSelector(todosSelector);
    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };
    const handleSaveClick = () => {
        switch (todo) {
            case '':
                return toast.error('This field is required!!!');
            case todo:
                const check = listTodo?.findIndex((value) => value.title === todo);
                if (check === -1) {
                    return dispatch(
                        updateRequest({ id: id, title: todo }, () => {
                            toast.success('Update Success!!!');
                            setTodo('');
                            setShowEdit(!showEdit);
                        }),
                    );
                }
                return toast.error('This to do already exits!!!');
            default:
        }
    };

    const handleDeleteClick = () => {
        dispatch(
            deleteRequest(id, () => {
                toast.success('Delete Success!!!');
                setListSearch('');
            }),
        );
    };
    const handleExitClick = () => {
        setShowEdit(!showEdit);
        setTodo('');
    };

    const handleChangeCheckbox = (e) => {
        dispatch(
            completedRequest({ id: id, completed: e.target.checked }, () => {
                toast.success('This todo DONE!!!');
            }),
        );
    };
    return (
        <>
            {!showEdit ? (
                <Row>
                    <Col span={18}>
                        <p className="test">{title}</p>
                    </Col>
                    <Col span={1}>{complete && <CheckOutlined />}</Col>

                    <Col span={5}>
                        <StytedDiv>
                            {complete ? (
                                <Checkbox checked onChange={handleChangeCheckbox}>
                                    Done
                                </Checkbox>
                            ) : (
                                <Checkbox onChange={handleChangeCheckbox} checked={false}>
                                    Done
                                </Checkbox>
                            )}
                        </StytedDiv>
                        <Space>
                            <Tooltip title="Delete">
                                <Button
                                    type="primary"
                                    danger
                                    shape="circle"
                                    icon={<DeleteOutlined />}
                                    onClick={handleDeleteClick}
                                />
                            </Tooltip>
                            <Tooltip title="Edit">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<EditOutlined />}
                                    onClick={handleEditClick}
                                />
                            </Tooltip>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col span={19}>
                        <Input size="medium" placeholder={title} onChange={handleChange} />
                    </Col>
                    <Col span={5}>
                        <StytedDiv>
                            {complete ? (
                                <Checkbox checked onChange={handleChangeCheckbox}>
                                    Done
                                </Checkbox>
                            ) : (
                                <Checkbox onChange={handleChangeCheckbox} checked={false}>
                                    Done
                                </Checkbox>
                            )}
                        </StytedDiv>
                        <Space>
                            <Tooltip title="Exit">
                                <Button
                                    type="primary"
                                    danger
                                    shape="circle"
                                    icon={<LogoutOutlined />}
                                    onClick={handleExitClick}
                                />
                            </Tooltip>
                            <Tooltip title="Save">
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<CheckOutlined />}
                                    onClick={handleSaveClick}
                                />
                            </Tooltip>
                        </Space>
                    </Col>
                </Row>
            )}
        </>
    );
}
