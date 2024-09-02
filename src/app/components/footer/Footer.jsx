
import Link from 'next/link';
import Image from 'next/image';
import './styles-footer.css'
import { Modal } from '@/app/components/modal/Modal';
import { useEffect, useState } from 'react';

const Footer = () => {
    const [modal, setModal] = useState(false);
    const [inputs, setInputs] = useState({
        user_email: "",
        user_name: "",
        message: "",
        subject: "Вопрос админу Vseresepty",
        email: "olawitcher@gmail.com",
        html: ""
    });


    const [messageErrors, setMessageErrors] = useState({
        nameError: "Введите ваше имя",
        emailError: "Введите email",
        messageError: "Введите сообщение",
        emailFormat: "Неверный формат",
    }); 


    const [emailErrorFormat, setEmailErrorFormat] = useState (false);
    const [nameError, setNameError] = useState (false);
    const [textError, setTextError] = useState (false);

    const handleClick = async () => {     
        setModal (true); 
      };

      const sendEmail = async (e) => {
        e.preventDefault();
        try {
             const res = await fetch(`/api/send_email`, 
             {    
                 method: "POST",
                 body: JSON.stringify(inputs)
             });  
        //     if (res.ok) {
                
        //     }
         }  
         catch (err) {
             console.log(err);
         }
        setModal(false)
    };
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    };

    useEffect(() => { 
        if (inputs.user_name.length>0) {            
            let trimStr =  inputs.user_name.trim(); 
            let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();
            inputs.user_name=trimStr1;
        }      
        if (inputs.user_name==="") {
            setNameError(false);
        } 
        else setNameError(true); 

        if (inputs.message.length>0) {            
            let trimStr =  inputs.message.trim(); 
            let trimStr1 = trimStr.replace(/\s+/g, ' ').trim();
            inputs.message=trimStr1;
        }          
        if (inputs.message==="") {
            setTextError(false);
        } 
        else setTextError(true);   
        inputs.html =`<p>${inputs.message}</p>Письмо от ${inputs.user_email}<p>`
  }, [inputs]) 


  const handleChangeEmail = (e) => {
    let email=e.target.value;
    let reg=/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test(email);
    if(reg===false)
    {
        setEmailErrorFormat(false);
    }
    if (reg===true)
    {
        setEmailErrorFormat(true);
    }
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

  return (
    <div>
        <div className="footerMain">
            <div className="footerWrapper">
                <div className="leftFooter">
                    <Image src="/img/logo.png" width={71} height={76} loading="lazy" alt="Logo Vseresepty.ru cooking recipes" />    
                    <Link href="/">всерецепты</Link>                                            
                </div>
                <div className="centerFooter">
                    <Link href="/recipes/kitchen"><span>ТИП КУХНИ</span></Link>
                    <Link href="/recipes/main"><span>ОСНОВНЫЕ</span></Link>
                    <Link href="/recipes/soup"><span>СУПЫ</span></Link>
                    <Link href="/recipes/second"><span>ВТОРЫЕ БЛЮДА</span></Link>
                    <Link href="/recipes/salad"><span>САЛАТЫ</span></Link>
                    <Link href="/recipes/pelmeni"><span>ПЕЛЬМЕНИ И МАНТЫ</span></Link>
                    <Link href="/recipes/snacks"><span>ЗАКУСКИ</span></Link>
                    <Link href="/recipes/dough"><span>ТЕСТО И ДЕСЕРТ</span></Link>
                    <Link href="/recipes/drink"><span>НАПИТКИ</span></Link>
                    <Link href="/recipes/multi"><span>МУЛЬТИВАРКА</span></Link>
                </div>
                <div className="rightFooter">
                    <Link href="/"><span>Все рецепты</span></Link>
                    <Link href="/users/add_recipe"><span>Добавить рецепт</span></Link>
                    <button type='button' onClick={handleClick}><span>Обратная связь</span></button>
                </div> 
                <Modal
                    isVisible={modal}
                    title="Ваше сообщение"
                    content={                    
                        <form id='formParam' onSubmit={sendEmail}>                            
                            <div className='formParam'>
                                <label>Имя</label>
                                <input type="text" id="user_name" name="user_name" onChange={handleChange} />
                                {((inputs.user_name.length===0)||(!nameError)) && <div className='error'>{messageErrors.nameError}</div>}
                            </div>                            
                            <div className='pd-t-10'>
                                <div className='formParam'>
                                    <label>Email</label>                            
                                    <input type="email" id="user_email" name="user_email" onChange={handleChangeEmail} />
                                    {inputs.user_email.length===0 && <span>{messageErrors.emailError}</span>}
                                    {!emailErrorFormat && <div className='error'>{messageErrors.emailFormat}</div>}
                                </div>
                            </div>
                            <div className='pd-t-10 formParam'>
                                <label>Сообщение</label>                        
                                <textarea id="message" name="message" onChange={handleChange} />
                                {((inputs.message.length===0)||(!textError)) && <div className='error'>{messageErrors.messageError}</div>}
                            </div>
                        </form>}
                    footer={(nameError&&textError&&emailErrorFormat) && <button className='buttonWhiteSm' onClick={sendEmail}>ОК</button>}
                    onClose={() => setModal(false)}    
                />             
            </div>
        </div>
     </div>
  )
}

export default Footer