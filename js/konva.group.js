function circleGroup(option) {
    this.init(option);

};

circleGroup.prototype = {
    init: function(option){
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.innerOpacity = option.innerOpacity || .5;
        this.outerOpacity = option.outerOpacity || .5;
        this.align = option.align || 'center';
        this.text = option.text || '';
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;
        this.innerStyle = option.innerStyle || '#fff';
        this.outerStyle = option.outerStyle || '#ddd';
        this.fontSize = option.fontSize || 20;
        this.fontColor = option.fontColor || '#ddd';


        //创建一个组
        //因为所有的东西都放在组里面了，这里x,y坐标就是组的坐标，
        //组里面的类容位置是根据组来定位的，有点像css里面的子绝父相
        this.group = new Konva.Group({
            x: this.x,
            y: this.y
        }); 

        //创建一个圆
        var circle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: this.innerRadius,
            fill: this.innerStyle,
            opacity: this.innerOpacity
        });
        this.group.add(circle); 

        //创建一个圆环
        var ring = new Konva.Ring({
            x: 0,
            y: 0,
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            fill: this.outerStyle,
            opacity: this.outerOpacity
        })
        this.group.add(ring);
        //创建一个文字

        var text = new Konva.Text({
            x: 0 - this.outerRadius,
            y: -7,
            text: this.text,
            fontSize: this.fontSize,
            fill: this.fontColor,
            width: this.outerRadius * 2,
            align: this.align,
        })
        this.group.add(text); 

        this.group.on('click',function(e){
            window.location.href = "http://www.baidu.com";
        })

    },
    addToGroupOrCircle:function(arg){
        arg.add(this.group);
    }
}