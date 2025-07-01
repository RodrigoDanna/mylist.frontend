import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import './ChangePassword.less';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    return (
        <>
            <Header type="return" />

            <form className="change-password-form">
                <div className="form-inputs">
                    <Input
                        type="text"
                        label="Senha Atual"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Input
                        type="password"
                        label="Nova Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                    <Input
                        type="password"
                        label="Repetir Nova Senha"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div className="form-buttons">
                    <Button className="cancel" onClick={() => navigate('/list')}>Cancelar</Button>
                    <Button className="apply">Salvar</Button>
                </div>
            </form>
        </>
    );
};

export default ChangePasswordPage;