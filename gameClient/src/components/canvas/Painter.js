export default function paintRect(context, x, y, color='black', w, h){
        context.fillStyle = color;
        return context.fillRect(x, y, w, h);
    }