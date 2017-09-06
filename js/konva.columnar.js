function konvaColumnar(option) {
    this._init(option);
};


konvaColumnar.prototype = {
    _init: function(option) {
        var containerID = option.containerID || "";
        var containerWidth = option.containerWidth || 0;
        var containerHeight = option.containerHeight || 0;
        var XLineData = option.XLineData || [];
        var YLineData = option.YLineData || [];

        var stage = new Konva.Stage({
            width: containerWidth,
            height: containerHeight,
            container: containerID
        });

        var layer = new Konva.Layer();
        stage.add(layer);

        var x0 = 1 / 8 * stage.width();
        var y0 = 3 / 4 * stage.height();

        var maxWidth = 3 / 4 * stage.width();
        var maxHeight = 1 / 2 * stage.height();

        var YLineTopHeight = 1 / 8 * stage.height();

        //x线
        var lineX = new Konva.Line({
            points: [x0, y0, x0 + maxWidth, y0],
            strokeWidth: 1,
            stroke: 'black',
            opacity: .5
        });
        layer.add(lineX);
        //y线
        var lineY = new Konva.Line({
            points: [x0, y0, x0, YLineTopHeight],
            stroke: 'black',
            strokeWidth: 1,
            opacity: .5
        })
        layer.add(lineY);

        var YLineHeight = y0 - YLineTopHeight

        var lineSection = (5 / 8 * stage.height()) / YLineData.length;
        console.log(lineSection);
        YLineData.forEach(function(item, index) {
            var text = new Konva.Text({
                x: x0 - 80,
                y: y0 - 6 - lineSection * (index + 1),
                text: item,
                fontSize: 14,
                opacity: .5,
                align: 'center',
                width: 100
            });
            layer.add(text);
            var line = new Konva.Line({
                stroke: '#000',
                strokeWidth: 1,
                points: [x0 - 10, y0 - lineSection * (index + 1), x0, y0 - lineSection * (index + 1)],
                opacity: .5,

            })
            layer.add(line);

        })


        var rectWidth = maxWidth / XLineData.length;

        //绘制矩形
        XLineData.forEach(function(item, index) {

            //绘制矩形
            var rect = new Konva.Rect({
                x: x0 + rectWidth * (1 / 4 + index),
                //y的总高度减去柱的高度，得到y坐标的值
                y: y0 - item.value * YLineHeight,
                fill: item.color,
                width: 2 / 4 * rectWidth,
                height: item.value * YLineHeight,
                opacity: .7,
                cornerRadius: 5
            });
            layer.add(rect);
            //绘制下方文本
            var textDown = new Konva.Text({
                x: x0 + rectWidth * (1 / 4 + index),
                y: y0,
                text: item.name,
                fill: item.color,
                fontSize: 14,
                padding: 6,
                rotation: 20
            })
            layer.add(textDown);

            //绘制上方文本
            var textTop = new Konva.Text({
                x: x0 + rectWidth * (1 / 4 + index),
                y: y0 - YLineHeight * item.value - 15,
                text: item.value * (YLineData.length * 10) + "%",
                fill: item.color,
                width: rectWidth,
                align: "left",
                name: 'textTop'
            })
            layer.add(textTop);
        });

        stage.draw();
        //click只能点击柱，如果需要点击任意位置，可以使用contentClick
        stage.on('contentClick', function() {
            layer.find("Rect").each(function(item, index) {
                item.height(0);
                item.y(y0);
                item.to({
                    duration: 1.5,
                    y: y0 - XLineData[index].value * YLineHeight,
                    height: XLineData[index].value * YLineHeight
                })
            });

            layer.find(".textTop").each(function(item, index) {
                item.y(y0 - 15),
                    item.to({
                        duration: 1.5,
                        y: y0 - YLineHeight * XLineData[index].value - 15,

                    })
            })
        })

    }
};