$(function(){
     kongbai={};

  for(i=0;i<15;i++){
     $('<b>').addClass('hang').appendTo('.qipan');
     $('<i>').addClass('lie').appendTo('.qipan');
     for(j=0;j<15;j++) {
          kongbai[i+'-'+j]={x:i,y:j };

        $('<div>').addClass('qizi').attr('id',i+'-'+j).data('pos',{x:i,y:j}).appendTo('.qipan');
     }
  }
   var kaiguan=true;
    var hei={};
    var bai={};

    var panduan=function(pos,color){
        var h= 1,s= 1,zx= 1,yx=1;
        var tx,ty;
        //横向
        tx=pos.x;ty=pos.y;
       while (color[tx+'-'+(ty+1)]){
           h++;ty++;
       }
        tx=pos.x;ty=pos.y;
        while (color[tx+'-'+(ty-1)]){
            h++;ty--;
        }

        //纵向
        tx=pos.x;ty=pos.y;
        while (color[(tx+1)+'-'+ty]){
            s++;tx++;
        }
        tx=pos.x;ty=pos.y;
        while (color[(tx-1)+'-'+ty]){
            s++;tx--;
        }



        //左斜
        tx=pos.x;ty=pos.y;
        while (color[(tx-1)+'-'+(ty-1)]){
            zx++;tx--;ty--;
        }
        tx=pos.x;ty=pos.y;
        while (color[(tx+1)+'-'+(ty+1)]){
            zx++;tx++;ty++;
        }

        //右斜
        tx=pos.x;ty=pos.y;
        while (color[(tx-1)+'-'+(ty+1)]){
            yx++;tx--;ty++;
        }
        tx=pos.x;ty=pos.y;
        while (color[(tx+1)+'-'+(ty-1)]){
            yx++;tx++;ty--;
        }


   return Math.max(h,s,zx,yx);
    }
    var ai=function(){
        var zuobiao;
        var max=-Infinity;
        for(var i in kongbai){
            var weixie=panduan(kongbai[i],hei);
            if(weixie>max){
                max=weixie;
                zuobiao=kongbai[i];
            }
        }
        var zuobiao2;
        var max2= -Infinity;
        for(var i in kongbai){
            var weixie=panduan(kongbai[i],bai);
            if(weixie>max2){
                max2=weixie;
                zuobiao2=kongbai[i];
            }
        }
        return(max>max2)?zuobiao:zuobiao2;
    }
    var isAi=true;
   $('.qizi').on('click',function(){
       var pos=$(this).data('pos');
       if ($(this).hasClass('hei')||$(this).hasClass('bai')){
           return;
       }

       if(kaiguan){
           $(this).addClass('hei');
           delete kongbai[pos.x+'-'+pos.y];
           console.log(kongbai)
           hei[pos.x+'-'+pos.y]=true;
           if(panduan(pos,hei)>=5){
               alert('ying');
               $('.qipan .qizi').off('click');
           }
           if(isAi){
               var pos=ai();
               $('#'+pos.x+'-'+pos.y).addClass('bai');
               bai[pos.x+'-'+pos.y]=true;
               delete kongbai[pos.x+'-'+pos.y];
               if(panduan(pos,bai)>=5){
                   alert('baiying');
                   $('.qipan .qizi').off('click');
               }
               return;
           }

       }else{
           $(this).addClass('bai')
           bai[pos.x+'-'+pos.y]=true;
           if(panduan(pos,bai)>=5){
               alert('ying');
               $('.qipan .qizi').off('click');
           }

       }

      kaiguan=!kaiguan;


   })
for (var i=0;i<5;i++){
    $('<span>').addClass('diandian').appendTo('.qipan');
}
});