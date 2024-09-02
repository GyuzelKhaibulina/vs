"use server";
import {utapi} from "../server/uploadthing"

export const imageRemove = async(imgKey) => {

    try {
        await utapi.deleteFiles (imgKey);
        return {success: true}

    }
    catch (e) {success: false}
}


