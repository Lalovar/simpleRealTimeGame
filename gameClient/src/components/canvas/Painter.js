export default async function paintRect(context, x, y, color='black', w, h, image){
        if(image !== undefined) {
                context.drawImage(image, x, y, w, h);
        }else{
                context.fillStyle = color;
                context.fillRect(x, y, w, h);
        }
    }