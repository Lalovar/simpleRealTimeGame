export default function paintRect(context, x, y, color='black', w=32, h=32, image){
        if(image !== undefined) {
                context.drawImage(image, x, y, w, h);
        }else{
                context.fillStyle = color;
                context.fillRect(x, y, w, h);
        }
    }