"use client";
import '../../../styles-recipes.css';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useContext } from 'react';
import Link from 'next/link';
import StarRating from '@/app/components/star_rating/page';
import { DateFormatDMY } from '@/app/services/date_service/page';
import DOMPurify from 'dompurify'; 
import ReactToPrint from 'react-to-print';
import {ShareSocialTelegram, ShareSocialFacebook, ShareSocialWatsapp, ShareSocialVK} from '@/app/components/share_social/page';
import { Modal } from '@/app/components/modal/Modal';
import ChoiсeStarRating from '@/app/components/choice_star_rating/ChoiceStarRating';
import CommunityRules from '@/app/components/community_rules/CommunityRules';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { AuthContext } from '@/context';
import { imageRemove } from '@/app/actions/imageRemove';
import { UploadDropzone } from '@/app/components/utils/uploadthing';
import { useSession } from "next-auth/react";
import Meta from '@/app/components/meta/page';



const SingleRecipe = () => {
    const { auth, currentUser } = useContext(AuthContext);
    const path = process.env.PATH_API;    
    const url = process.env.URL;
    const currentUrl = usePathname();
    const router = useRouter();
    const [userReview, setUserReview] = useState (true);  // проверка оставлял ли юзер отзыв
    const [rating, setRating] = useState(0);  // среднее значение рейтинга
    const cat = currentUrl.split("/")[2];
    const sub_type = currentUrl.split("/")[3];
    const id = currentUrl.split("/")[4];
    const [recipe, setRecipe] = useState([{name:""}]);
    const componentRef = useRef();
    const [visibleSocial, setVisibleSocial] = useState (false);   
    const shareUrl = `${url}${currentUrl}`;
    const [cook, setCook] = useState ([]);
    const [checkSaved, setCheckSaved] = useState(true); 
    const [modal, setModal] = useState(false); 
    const [secondModal, setSecondModal] = useState(false);
    const [thirdModal, setThirdModal] = useState();    
    const refReviews = useRef(null);
    const refPhotos = useRef(null);
    const [reviews, setReviews] = useState ({"params": []}); 
    const [note, setNote] = useState ("");   
    const [changeRating, setChangeRating] = useState(0);
    const [file, setFile] = useState(null);
    const [userImg, setUserImg] = useState ("");    // доп фото от юзеров
    const [savedRecipes, setSavedRecipes] = useState ("");  // сохраненные рецепты строка из базы
    const [savedRecipesSocial, setSavedRecipesSocial] = useState ("");  // сохраненные рецепты строка из базы
    const img = [];
    const session = useSession();
    const imgArr = reviews?.params?.filter(i => i.photos?.length>0);
    const [imgUrl, setImgUrl] = useState(null); // url для загрузки картинок на uploadthing.com
    const [imgKey, setImgKey] = useState (null); // key для загрузки картинок на uploadthing.com
    const [saveImg, setSaveImg] = useState (true);
    const [isRating, setIsRating] = useState (false);
    const [user, setUser] = useState (null);
    const [userSocial, setUserSocial] = useState (null);
    const [objSaved, setObjSaved] = useState ({"saved":[]});     
    const [objSavedSocial, setObjSavedSocial] = useState ();
    const [isSavedSocial, setIsSavedSocial] = useState (); 
    const [typeUser, setTypeUser] = useState(null);
    const savedUser = {"recipe":currentUrl, "name": recipe[0]?.name, "img": recipe[0]?.img_main};

    const [typeRecipe, setTypeRecipe] = useState();
    const [subTypeRecipe, setSubTypeRecipe] = useState();

    imgArr?.map ((i) => img.push({"original": `${i.photos}`, "thumbnail": `${i.photos}`, "description": `Автор: ${i.user}`}));

    const clickReviews = () => {
        refReviews.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const clickPhotos = () => {
        refPhotos.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        let v = 0;
        let l = 0;
        if (reviews?.params?.length!==0) {
            for (let i=0; i<reviews?.params?.length; i++) {
                v= v+Number(reviews?.params[i].rating);  
            }
            for (let j=0; j<reviews?.params?.length; j++) {
                if (reviews?.params[j].rating>0)                
                {
                    l = l+1;                
                }
            }
            setRating((v/l).toFixed(0));

            async function sendRating() {
                const res = await fetch(`${path}cooking/review?cat=${cat}&id=${id}`, {
                    method: "PUT",
                    body: JSON.stringify({rating}),
               })                    
               .catch((err) => {
                    console.log(err);
               });
              }
              sendRating();
        }
        setUserReview (true);
        reviews?.params?.forEach((item)=>{
                if (item.user === currentUser || item.user === session.data?.user.email) 
                    {
                        setUserReview (false);
                    };             
            })            
    }, [reviews, isRating]);

    useEffect (( ) => {
        async function getRecipe() {
            const res = await fetch(`${path}cooking?type=${cat}&id=${id}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {
                setRecipe(data);           
                const newStr = JSON.parse(data[0].cook);
                setCook(newStr);
                setReviews(JSON.parse(data[0].review));    
            }).catch((err) => {
                console.log(err);
            });
          }
          getRecipe();   

          if (cat==="kitchen")
          {
               setTypeRecipe("Кухня");
          }
          if (cat==="main")
          {
               setTypeRecipe("Основные");
          }
          if (cat==="soup")
          {
               setTypeRecipe("Супы");
          }
          if (cat==="second")
          {
               setTypeRecipe("Вторые блюда");
          }
          if (cat==="salad")
          {
               setTypeRecipe("Салаты");
          }
          if (cat==="pelmeni")
          {
               setTypeRecipe("Пельмени");
          }
          if (cat==="snacks")
          {
               setTypeRecipe("Закуски");
          }
          if (cat==="dough")
          {
               setTypeRecipe("Тесто и десерт");
          }
          if (cat==="drink")
          {
               setTypeRecipe("Напитки");
          }
          if (cat==="multi")
          {
               setTypeRecipe("Мультиварка");                                     
          }
    }, [cat]);

    useEffect (( ) => {
        if (currentUser) {setUser (currentUser); setTypeUser("users")}
        else {
            if (session) {setUser (session?.data?.user.email); setTypeUser("users_social")}  
        }
    }, [currentUser, session]);


    useEffect (( ) => {
        setUserSocial (session?.data?.user.email);                          
    }, [session]);

    useEffect (( ) => {
        if (user!==null)
            {
                async function getSavedRecipe() {
                    const res = await fetch(`${path}users/save_recipes?email=${user}`, {
                        method: "GET",
                    })                    
                    return res.json().then((data) => {                            
                        setSavedRecipes(data[0]);   
                    }).catch((err) => {
                        console.log(err);
                    });
                  }
                getSavedRecipe();  
            }                    
    }, [user]);

    useEffect (( ) => {
        if (userSocial!==null && session?.data?.user.email) {                
            async function getSavedRecipe() {
                const res = await fetch(`${path}social_login/save_recipes?email=${session?.data?.user.email}`, {
                method: "GET",
            })                    
            return res.json().then((data) => {   
                if (data[0]?.saved_recipes) {
                    setSavedRecipesSocial(data[0]);
                }                          
                if (data[0]?.saved_recipes==="[]" || data[0]===undefined) {
                    setSavedRecipesSocial ({saved: []})
                }    
            }).catch((err) => {
               console.log(err);
            });
          }
        getSavedRecipe();       
      }              
    }, [userSocial]);

    useEffect (( ) => {  
        let imgArr = reviews?.params?.filter((i) => i.photos);
        let img = [];
        imgArr?.map ((i) => img.push({"original": `/img/upload/${i.photos}`, "thumbnail": `/img/upload/${i.photos}`, "description": `Автор: ${i.user}`}));
        setUserImg(img);
    }, [reviews]);

    const handleDelete = async ()=>{
        try {
             await fetch(`/api/cooking/${cat}/${sub_type}/${id}/delete`, {
                 method: "DELETE",
                 body: JSON.stringify({type: `${cat}`, id: `${id}`})                
            })                                 
            } catch (err) {
                return err;
        }
        setModal(false);
        router.push(`/recipes/${cat}/${sub_type}`);   
      }
      

    const handleCommunityRules = (() => 
    {
          setThirdModal(true);  
    })

    const handleChangeRating = (value) => 
    {
        setChangeRating(value);  // выставленный рейтинг
    }       
      const sendReview = async  () => { 
        const reviewAll = reviews;  
        let reviewUser = "";
        if (currentUser || session.data) {
            reviewUser = {"user": user, "review": note, "rating": changeRating, "photos": imgUrl};
        }   
        reviewAll.params.push (reviewUser);
        var reviewJson = JSON.stringify(reviewAll);        
        setIsRating (true);  // флаг выставленного юзером рейтинга 
        async function sendReview() {
             const res = await fetch(`${path}cooking/review?cat=${cat}&id=${id}`, {
                 method: "POST",
                 body: reviewJson,
            })                    
             .catch((err) => {
                 console.log(err);
             });
           }
          sendReview();      
    }


    const saveRecipe = async  (e) => {    
        e.preventDefault();         
  
        if ((!user) && (!session?.data)) {   // если юзер не зареган
            setSecondModal (true);
            return;
        }
        else setSecondModal (false);  
    
        if (user && savedRecipes?.saved_recipes) {                                  
            let obj = JSON.parse(`${savedRecipes.saved_recipes}`);                          
            obj.saved.forEach(function(item) {  // проверка есть ли данный рецепт в сохраненных     
                if (item.recipe===currentUrl) 
                {
                    setCheckSaved(false);                                                   
                }
                else obj.saved.push(savedUser);                
            }); 
            if (obj.saved.length===0)
            {
                obj.saved.push(savedUser);
            }
            setObjSaved (obj);
        }  
        if (userSocial)    {   // если соц юзер            
                setIsSavedSocial (false)
                 async function getSocialUsers() {
                    const res = await fetch(`${path}social_login/users?email=${userSocial}`, {
                        method: "GET",
                 })  
                 if (res.status===404) {  // если юзера с таким майл не сущ, послать запрос на создание соц юзера 
                     let obj = new Object(savedRecipesSocial);                                   
                     Object.keys(savedRecipesSocial).forEach(function(key) {          
                     obj?.saved?.push(savedUser)
                    });   
                    
                    try {
                        const res = await fetch (`${path}social_login/users?email=${userSocial}`, {
                            method: "POST",
                            body: JSON.stringify(obj)
                        })
                    }
                    catch {(e)=> {return e}}
                 }
                 if (res.status===200 && savedRecipesSocial?.saved_recipes) { // юзер в базе 
                    let obj = JSON.parse(`${savedRecipesSocial.saved_recipes}`);                           
                    obj.saved.forEach(function(item) {  // проверка есть ли данный рецепт в сохраненных  
                        if (item.recipe===currentUrl) 
                        {
                            setCheckSaved(false);                                    
                        }
                        else setCheckSaved(true);   
                      }); 
                    setObjSavedSocial(obj)      
                  }
                  return res.json().then((data) => {                                      
                  }).catch((err) => {
                      return err;
                  });
             }            
             getSocialUsers();                                  
        }                       
    }

    useEffect (( ) =>  { 
        console.log ("session?.data?.user.email", session)
            if ((user!==null) && !session?.data?.user.email) { 
                
                try {
                    fetch(`${path}users/save_recipes?email=${user}&type=${typeUser}`, {
                        method: "PUT",   
                        body: JSON.stringify(objSaved)            
                    })
                    } 
                catch (err) {
                    console.log(err);
                }            
        }
    }, [checkSaved, objSaved]);

    useEffect (( ) =>  { 
        if (checkSaved===true) {
            objSavedSocial?.saved.push(savedUser);              
            if (session.data && objSavedSocial!==undefined) {           
                try {
                    fetch(`${path}social_login/save_recipes?email=${userSocial}`, {
                        method: "PUT",   
                        body: JSON.stringify(objSavedSocial)
                    })
                } 
                catch (err) {
                    console.log(err);
                }
            }
        } 
     }, [checkSaved, objSavedSocial]);

    const handleRemove = async() => {
        const res = await imageRemove (imgKey);
            if (res.success) {
                alert ("Файл успешно удален!");
                setImgUrl(null);
                setImgKey();
                setSaveImg(true);
            }
            else {
                setSaveImg(true);
                alert ("Файл не был удален. Попробуйте еще раз.");
        }
    }  

  return (
    <div>   
        <Meta 
        title={`${typeRecipe}:${recipe[0]?.name} рецепт приготовления с пошаговым фото recipes cooking preparing delicious dish`}
        description={`${typeRecipe}:${recipe[0]?.name} рецепт приготовления с пошаговым фото recipes preparing delicious dishes`}
        keywords={`${typeRecipe}, ${recipe[0]?.name}, рецепт блюд, готовить рецепт, пошагово приготовить блюдо, вкусное блюдо, приготовить еду, кухни мира, кулинарные рецепты, вкусно, просто, по шагам, праздничное, с фото, preparing recipes, cook dish, delicious dishes`}
        robots="noindex"
        />    
        <div className='wrapRecipe wrapRecipeSm'>  
            <div className='contentRecipe'> 
                <div className='headerRecipe'>              
                    <div className='breadcrumbs  text-left'>
                            <a href="/recipes">РЕЦЕПТЫ</a>                            
                            <Link href={`/recipes/${cat}`}> / {typeRecipe}</Link>
                    </div>   
                </div>                             
                {recipe && 
                    <><h1>{recipe[0]?.name}</h1>
                            <div key={recipe}>                                
                                <span onClick={clickReviews}>             
                                    <StarRating onClick={clickReviews}                    
                                        count={5}
                                        size = {24}
                                        rating = {recipe[0].rating}
                                    ></StarRating>                
                                </span>
                                <span className='ratingRecipe'>  
                                    <span className='ratingBorder'></span>
                                    <span onClick={clickReviews}>ОТЗЫВЫ</span>
                                    <span className='ratingBorder'></span>
                                    <span onClick={clickPhotos}>ФОТО</span>
                                </span>
                                <p className='note'>{recipe[0]?.note}</p>
                                {recipe[0].username && <span className='publishDate'>Автор рецепта: <span>{recipe[0].username}</span>
                                <span className='ratingBorder'></span> Опубликовано {DateFormatDMY(recipe[0]?.date)} </span>}
                                <div className='recipeButtons'>
                                    <span className='recipeButtonsWrap'>
                                        <span className='recipeSaveButton' onClick={saveRecipe}>
                                            <span>Сохранить</span><img src="/img/save-icon.png" loading="lazy" alt="сохранить рецепт save cooking recipe"/>
                                        </span>
                                        <span className='recipeRatingButton'>
                                            <span onClick={clickReviews}>Рейтинг </span><img src="/img/star-icon.png" alt="recipe rating"/>
                                        </span>
                                    </span>
                                    <span className='ratingBorder'></span>
                                    <ReactToPrint
                                        trigger={() => {return <span className="recipePrintButton"><span>Печать</span><img src="/img/print-icon.png"  loading="lazy" alt={`"рецепт ${recipe[0].name}"`}/></span>}}
                                        content={() => componentRef.current}
                                        documentTitle= {recipe[0].name} 
                                        pageStyle="print"
                                    />                         
                                    <span className='ratingBorderPrint'></span>

                                    {!visibleSocial &&
                                    <><span className='recipeShareButton' onClick={()=>setVisibleSocial(true)}>
                                        <span>Поделиться </span><img src="/img/share-icon.png" alt={`"поделиться рецептом ${recipe[0].name}"`}/>
                                    </span><span className='ratingBorderShare'></span></>}

                                {visibleSocial &&
                                    <span className='social'>
                                        <ShareSocialTelegram
                                            shareUrl={shareUrl}
                                            title={recipe[0].name}
                                            width="18px"
                                            height="18px"
                                            fill="rgba(0, 0, 0, 0.65)"
                                            className="social-icon"
                                        />
                                        <span className='ratingBorder'></span>
                                        <ShareSocialFacebook
                                            shareUrl={shareUrl}
                                            title={recipe[0].name}
                                            width="14px"
                                            height="14px"
                                            fill="rgba(0, 0, 0, 0.65)"
                                            count="10"
                                            countVisible="true"
                                            className="social-icon-top2"
                                        /> 
                                        <span className='ratingBorder'></span>                         
                                        <ShareSocialVK 
                                            shareUrl={shareUrl}
                                            title={recipe[0].name}
                                            width="17px"
                                            height="17px"
                                            fill="rgba(0, 0, 0, 0.65)"
                                            count="10"
                                            countVisible="true"
                                            className="social-icon-top5"
                                        />  
                                        <span className='ratingBorder'></span>
                                        <ShareSocialWatsapp  
                                            shareUrl={shareUrl}
                                            title={recipe[0].name}
                                            width="17px"
                                            height="17px"
                                            fill="rgba(0, 0, 0, 0.65)"
                                            count="10"
                                            countVisible="true"
                                            className="social-icon-top6"
                                        />        
                                    </span>
                                } 
                                </div>  

                                <Modal
                                    isVisible={secondModal}
                                    title="Требуется регистрация"
                                    content={<div><p>Чтобы добавить в избранное, требуется <Link href={`/login`}>регистрация</Link></p></div>}
                                    onClose={() => setSecondModal(false)}    
                                />   

                                <img className='img_main' src={`/upload/${recipe[0].img_main}`} alt={`фото блюда ${recipe[0].name} recipe`}/>

                            <div ref={componentRef}>
                                <div className='ingredients'>
                                    <div>
                                        <h2>Ингредиенты:</h2>                
                                        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe[0].ingredients),}}></p>  
                                    </div>
                                </div>                
                                <div className='cooking'>
                                    <div><h2>Приготовление:</h2>
                                    {!cook && <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(recipe[0].cooking),}}></p>}
                                        {cook && cook.map((item, index) => {return (
                                            <div key={`cook`+index}>
                                                {item.step && <h3>{`${item.step}`}</h3>}
                                                {item.cook && <p>{`${item.cook}`}</p>}
                                                {item.img && <><img src={`/upload/${item.img}`} alt={`"${recipe[0].name}"`}/></>}                                            
                                            </div>                                    
                                        )})} 
                                    </div>
                                </div>  
                            </div>

                        {(recipe[0]?.username === user) &&                     
                            <> 
                                <div className='buttonRightWrap'> 
                                    <button className='buttonTransparent'>
                                        <Link href={`${currentUrl}/edit`}><span>ПРАВИТЬ</span></Link>
                                    </button>
                                    <button className='buttonOrange' onClick={() => setModal(true)}>Удалить Рецепт</button>
                                </div>
                                <Modal
                                    isVisible={modal}
                                    title="Удалить рецепт"
                                    content={<p>Вы хотите удалить данный рецепт?</p>}
                                    footer={<button className='buttonWhiteSm' onClick={handleDelete}>ДА</button>}
                                    onClose={() => setModal(false)}    
                                />  
                                </>
                            }
                            <h2 className='review' ref={refReviews} id="reviews">Отзывы</h2>
                            {((user || session?.data) && !userReview) && <p>Вы уже оставляли свой отзыв. Спасибо!</p>} 
                            {(user===undefined) && <div><p>Чтобы оставить отзыв требуется <a className="linkGray" href="/login" alt="">авторизация</a></p></div>}
                            
                            {((user || session?.data) && userReview) && <>
                                <div>                                                                      
                                    <div className='reviewWrap'>                                                                              
                                            <div className='registrationLink'><p>Ознакомьтесь с нашими <span onClick={handleCommunityRules}>Правилами сообщества</span> об отзывах.</p></div>
                                                <h3><img src="/img/icon_recipe.png" alt=""/>{recipe[0].name}</h3> 
                                                <h4>Ваш рейтинг</h4>
                                                <ChoiсeStarRating                    
                                                    count={5}
                                                    size = {50}
                                                    activeColor={"rgb(211, 28, 3)"}
                                                    inactiveColor={"rgba(0, 0, 0, 0.15)"}
                                                    onChange={handleChangeRating}
                                                    rating = {changeRating}
                                                    rightBlock = {true}
                                                ></ChoiсeStarRating>                                                
                                                <h4>Ваш отзыв</h4>
                                                <textarea type="text" name="title" placeholder="Что вы думаетет об этом рецепте? Меняли ли вы рецепт, есть ли у вас какие либо замечания?" onChange={((e)=>setNote(e.target.value))}  />                                                
                                                <h5>Фото рецепта</h5>
                                                {(saveImg) &&
                                                    <UploadDropzone
                                                        endpoint="imageUploader"
                                                        onClientUploadComplete={(res) => {
                                                        setImgUrl (res[0].url);
                                                        setImgKey (res[0].key);
                                                        setSaveImg (false);
                                                        alert("Файл загружен");
                                                        }}
                                                        onUploadError={(error) => {
                                                        alert(`Ошибка загрузки файла. Размер не должен превышать 12Мб. ${error}`);
                                                        }}
                                                    />
                                                }
                                                {(!saveImg) &&
                                                    <div className='img-prev '>
                                                        <img src={imgUrl} alt="image upload" className='object-cover h-auto w-full' />                
                                                        <button onClick={handleRemove}>Удалить фото</button>
                                                    </div>
                                                }
                                                <label htmlFor="file">
                                                    <div className='addImg'>            
                                                        <div>
                                                            <input style={{ display: "none" }} type="file" id="file" name="" onChange={(e) => setFile(e.target.files[0])} />
                                                          </div> 
                                                        {(note || (changeRating!==0) || !saveImg) &&                     
                                                        <div className='buttonRightWrap'>
                                                            <button className='buttonOrange' type='submit' onClick={((event) => sendReview(event))}>Отправить</button>  
                                                        </div>
                                                        }
                                                    </div> 
                                                </label> 
                                            <Modal
                                                isVisible={thirdModal}
                                                title="Правила сообщества"
                                                content={CommunityRules}
                                                onClose={() => setThirdModal(false)}    
                                            />                                                                                                     
                                            </div>                    
                                        </div> 
                                        </> 
                                        }
                                    </div>
                                    {reviews.params[0] &&
                                    <div className='reviewItemWrap'>                      
                                            {reviews?.params?.map((item, index) => {
                                                return (  
                                                        <div className='reviewItem' key={`review`+index}>
                                                            <h4>{item.user}</h4>
                                                            <StarRating                    
                                                                count={5}
                                                                size = {20}
                                                                rating = {item.rating}
                                                            ></StarRating>  
                                                            <p>{item.review}</p>
                                                        </div>
                                                    )
                                                }
                                            )} 
                                        </div> }
                                </>
                                }
                    {(img.length>0) &&                    
                        <div ref={refPhotos}>          
                            <ImageGallery items={img} />
                        </div>
                    }
            </div>
        </div>
    </div>

  )
}

export default SingleRecipe