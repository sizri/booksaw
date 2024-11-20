import React, { useEffect, useState } from 'react';
import { Table, message, Modal, Form, Input, Button, Select, InputNumber, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  // 상태 관리
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const address = 'http://localhost:8080';
  const navigate = useNavigate()
  // 모달 상태 관리
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  const token = localStorage.getItem('token'); // 실제 토큰 가져오기

  // 스타일 정의 (컴포넌트 내부에서 관리)
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f2f5',
    },
    title: {
        textAlign: 'center',
        fontSize: '36px',
        marginBottom: '35px',
        fontFamily: "'Noto Sans KR'",
   
      },
    table: {
      backgroundColor: '#fff',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
    button: {
      marginLeft: '10px',
    },
  };

  // 컬럼 정의
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center',
    },
    {
      title: '사용자명',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '잔액',
      dataIndex: 'balance',
      key: 'balance',
      width: 100,
      align: 'right',
      render: (value) => value.toLocaleString(),
    },
    {
      title: '권한',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      align: 'center',
    },
    {
      title: '액션',
      key: 'action',
      width: 150,
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => editUser(record)}
            style={{ marginRight: '8px' }}
          >
            수정
          </Button>
          <Button type="danger" onClick={() => deleteUser(record.id)}>
            삭제
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${address}/api/users`
      );
      console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      message.error('사용자 데이터를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 사용자 수정 함수
  const editUser = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user
     );
    setIsModalVisible(true);
  };

  // 사용자 삭제 함수
  const deleteUser = (id) => {
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 사용자를 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          await axios.delete(`${address}/api/users/${id}`
          );
          message.success('사용자가 삭제되었습니다.');
          fetchUsers();
        } catch (error) {
          message.error(`사용자 삭제에 실패했습니다: ${error.message}`);
        }
      },
    });
  };

  // 모달에서 '확인' 버튼 클릭 시 호출되는 함수
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const userId = editingUser.id;

      // 비밀번호 필드 처리
      if (values.password === '********') {
        delete values.password; // 비밀번호를 변경하지 않는 경우 서버로 보내지 않음
      }

      await axios.put(`${address}/api/users/${userId}`, values, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      message.success('사용자 정보가 업데이트되었습니다.');
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error(
        `사용자 정보를 업데이트하는데 실패했습니다: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // 모달에서 '취소' 버튼 클릭 시 호출되는 함수
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  return (
    <div style={styles.container}>
              <Button type="link" onClick={()=>navigate(-1)} icon={<ArrowLeftOutlined />} >
          뒤로가기
        </Button>
      <h2 style={styles.title}>사용자 목록</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
        size="small"
        style={styles.table}
      />

      <Modal
        title="사용자 수정"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="저장"
        cancelText="취소"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="사용자명"
                rules={[
                  { required: true, message: '사용자명을 입력해주세요.' },
                  { max: 50, message: '사용자명은 최대 50자까지 가능합니다.' },
                ]}
              >
                <Input placeholder="사용자명을 입력하세요" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="이메일"
                rules={[
                  { required: true, message: '이메일을 입력해주세요.' },
                  { type: 'email', message: '유효한 이메일을 입력해주세요.' },
                  { max: 100, message: '이메일은 최대 100자까지 가능합니다.' },
                ]}
              >
                <Input placeholder="이메일을 입력하세요" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="balance"
                label="잔액"
                rules={[{ required: true, message: '잔액을 입력해주세요.' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="잔액을 입력하세요"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="권한"
                rules={[{ required: true, message: '권한을 선택해주세요.' }]}
              >
                <Select placeholder="권한을 선택하세요">
                  <Select.Option value="ROLE_USER">사용자</Select.Option>
                  <Select.Option value="ROLE_ADMIN">관리자</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="password"
                label="비밀번호"
                rules={[
                  { required: true, message: '비밀번호를 입력해주세요.' },
                //   { min: 8, message: '비밀번호는 최소 8자 이상이어야 합니다.' },
                ]}
              >
                <Input.Password
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="new-password"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
