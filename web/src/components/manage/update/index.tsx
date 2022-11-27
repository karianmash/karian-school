import adminStyles from "../admin/Admin.module.css";
import styles from "../product/Product.module.css";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

function UserUpdate() {
    const baseUrl = 'http://localhost:8000/api/';
    const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();
    const { user } = useParams();
    const [role, setRole] = useState('');
    const [message, setUserMessage] = useState('');
    const [fname, setfname] = useState('');
    const [sname, setsname] = useState('');
    const [email, setemail] = useState('');

    useEffect(() => {
        middleware();
        setUserRole();
        getUpdateUser();
    }, []);

    const middleware = async () => {
        let userRole = loggedUser.role;
        if (userRole == 'admin' || userRole == 'school') {
        } else {
            navigate('/login');

        }
    }

    const setUserRole = async () => {
        if (loggedUser.role == 'admin') {
            setRole(loggedUser.role);
        } else if (loggedUser.role == 'business') {
            setRole(loggedUser.role);
        } else if (loggedUser.role == 'school') {
            setRole(loggedUser.role);
        } else {
            setRole('');
        }
    }

    const getUpdateUser = async () => {
        const reqUser = await axios.get(baseUrl + 'user/' + user);
        if (reqUser.status == 200) {
            let userContainer = reqUser.data.user;
            setfname(userContainer.first_name);
            setsname(userContainer.second_name);
            setemail(userContainer.email);
        }
    }
    const updateUser = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', fname);
        formData.append('second_name', sname);
        formData.append('email', email);

        await axios.post(baseUrl + 'user/update/' + user, formData).then((updateResponse) => {
            if (updateResponse.status == 200) {
                setUserMessage('User updated successfully');
                setTimeout(() => {
                    setUserMessage('');
                    if (loggedUser.role == 'admin') {
                        navigate('/admin');
                    } else if (loggedUser.role == 'school') {
                        navigate('/school');
                    } else {
                        navigate('/login');
                    }
                }, 2000);
            }
        }).catch((error) => {
            setUserMessage('Update failed, email might be available!');
            setTimeout(() => {
                setUserMessage('');
            }, 3000);
        });
    }
    return (
        <>
            <div className={adminStyles.banner}>
                <div className={adminStyles.bannerContent}>
                    <h1 className={adminStyles.title} style={{ textTransform: 'capitalize' }}>{role}</h1>
                </div>
            </div>
            <div className={styles.container}>
                <div style={{ marginBottom: '5px' }}>{message}</div>
                <form onSubmit={updateUser}>
                    <div style={{ display: 'flex' }}>
                        <div className={styles.field} style={{ marginRight: '10px' }}>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={fname}
                                onChange={(e) => { setfname(e.target.value) }}
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Second Name</label>
                            <input
                                type="text"
                                name="secondName"
                                value={sname}
                                onChange={(e) => { setsname(e.target.value) }}
                                placeholder="Enter second name"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className={styles.field} style={{ marginRight: '10px' }}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className={styles.btn}>
                        {/* <div className={styles.btns}>
                            <button onClick={navigateBack} type="button">Go back</button>
                        </div> */}
                        <div className={styles.btns}>
                            <button type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserUpdate