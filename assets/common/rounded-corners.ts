import { _decorator, CCInteger, Component, Graphics, Mask, UITransform } from 'cc';

const { ccclass, property, executeInEditMode, requireComponent } = _decorator;

@ccclass('RoundedCorned')
@executeInEditMode()
@requireComponent(Mask)
export class RoundedCorned extends Component {

    private m_Radius: number = 10;
    @property({ type: CCInteger, tooltip: '矩形圆角半径' })
    public get radius() {
        return this.m_Radius;
    }
    public set radius(value: number) {
        this.m_Radius = value;
        this.render();
    }

    start() {
        this.render();
    }

    protected onDestroy(): void {
        const g = this.node.getComponent(Graphics);
        g.clear();
    }

    private render() {
        const uiTransform = this.node.getComponent(UITransform);
        const g = this.node.getComponent(Graphics);
        g.clear();
        g.roundRect(-uiTransform.width / 2, -uiTransform.height / 2, uiTransform.width, uiTransform.height, this.radius);
        g.fill();
    }
}
