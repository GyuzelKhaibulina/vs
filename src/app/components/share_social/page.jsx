import React from 'react';
import {
    FacebookShareButton,    
    VKShareButton,
    WhatsappShareButton,    
    TwitterShareButton,    
    TelegramShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";



export const ShareSocialTelegram  = ({ shareUrl, title, width, height, fill, className }) => {
    return (
        <TelegramShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className={className}
          >
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={fill} d="M19.2,4.4L2.9,10.7c-1.1,0.4-1.1,1.1-0.2,1.3l4.1,1.3l1.6,4.8c0.2,0.5,0.1,0.7,0.6,0.7c0.4,0,0.6-0.2,0.8-0.4c0.1-0.1,1-1,2-2l4.2,3.1c0.8,0.4,1.3,0.2,1.5-0.7l2.8-13.1C20.6,4.6,19.9,4,19.2,4.4z M17.1,7.4l-7.8,7.1L9,17.8L7.4,13l9.2-5.8C17,6.9,17.4,7.1,17.1,7.4z"/>
            </svg>
          </TelegramShareButton>

    );
}

export const ShareSocialFacebook  = ({ shareUrl, title, width, height, fill, countVisible="false", className }) => {
    return (
        <>
            <FacebookShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className={className}
            >
            <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="-337 273 123.5 256">
                <path fill={fill} d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"/>
            </svg>
            </FacebookShareButton>
            {/* {countVisible && <div>
                <FacebookShareCount url={shareUrl} className="social-count">
                    {count => count}
                </FacebookShareCount>
            </div>} */}
        </>
    );
}

export const ShareSocialTwitter  = ({ shareUrl, title, width, height, fill, countVisible="false", className }) => {
    return (
        <>
            <TwitterShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className={className}
            >           
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"  width={width} height={height} fill="none" >    
                <path fill={fill} d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"/>        
            </svg>
            </TwitterShareButton>

        </>
    );
}

export const ShareSocialWatsapp  = ({ shareUrl, title, width, height, fill, countVisible="false", className }) => {
    return (
        <>
            <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className={className}
            >
            <svg width={width} height={height} fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill={fill} d="M16.8 5.7C14.4 2 9.5.9 5.7 3.2 2 5.5.8 10.5 3.2 14.2l.2.3-.8 3 3-.8.3.2c1.3.7 2.7 1.1 4.1 1.1 1.5 0 3-.4 4.3-1.2 3.7-2.4 4.8-7.3 2.5-11.1zm-2.1 7.7c-.4.6-.9 1-1.6 1.1-.4 0-.9.2-2.9-.6-1.7-.8-3.1-2.1-4.1-3.6-.6-.7-.9-1.6-1-2.5 0-.8.3-1.5.8-2 .2-.2.4-.3.6-.3H7c.2 0 .4 0 .5.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4.1.2 0 .4-.1.5-.1.1-.2.3-.3.4-.2.1-.3.3-.2.5.4.6.9 1.2 1.4 1.7.6.5 1.2.9 1.9 1.2.2.1.4.1.5-.1s.6-.7.8-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.5.3.1.3.1.7-.1 1z"/>
            </svg>
            </WhatsappShareButton>
            {/* {countVisible && <div>
            </div>} */}
        </>
    );
}

export const ShareSocialVK  = ({ shareUrl, title, width, height, fill, countVisible="false", className }) => {
    return (
        <>
            <VKShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className={className}
            >
            <svg width={width} height={height} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill={fill} d="M21.579 6.855c.14-.465 0-.806-.662-.806h-2.193c-.558 0-.813.295-.953.619 0 0-1.115 2.719-2.695 4.482-.51.513-.743.675-1.021.675-.139 0-.341-.162-.341-.627V6.855c0-.558-.161-.806-.626-.806H9.642c-.348 0-.558.258-.558.504 0 .528.79.65.871 2.138v3.228c0 .707-.127.836-.407.836-.743 0-2.551-2.729-3.624-5.853-.209-.607-.42-.852-.98-.852H2.752c-.627 0-.752.295-.752.619 0 .582.743 3.462 3.461 7.271 1.812 2.601 4.363 4.011 6.687 4.011 1.393 0 1.565-.313 1.565-.853v-1.966c0-.626.133-.752.574-.752.324 0 .882.164 2.183 1.417 1.486 1.486 1.732 2.153 2.567 2.153h2.192c.626 0 .939-.313.759-.931-.197-.615-.907-1.51-1.849-2.569-.512-.604-1.277-1.254-1.51-1.579-.325-.419-.231-.604 0-.976.001.001 2.672-3.761 2.95-5.04z"/>
            </svg>
            </VKShareButton>
        </>
    );
}









