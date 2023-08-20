import { _decorator, Component, EventTouch, instantiate, Mask, math, Node, Prefab, UITransform, v2 } from 'cc';

const { ccclass, property, executeInEditMode, requireComponent } = _decorator;

@ccclass('VirtualList')
// @executeInEditMode()
@requireComponent(Mask)
export class VirtualList<T> extends Component {
    private m_ChildNodes: Node[] = [];
    private m_Childs: {
        node: Node;
        index: number;
    }[] = [];

    private m_List: T[] = [];

    private m_Bottom: number = 0;
    private m_TotalHeight: number = 0;
    private m_Top: number = 0;

    private m_IsMove: boolean = false;

    private m_TouchLocation = v2();
    private m_LastY: number;

    private m_Func: (node: Node, item: T) => void;

    @property({ type: Prefab, tooltip: '列表子元素预制体' })
    public prefab: Prefab;

    @property({ tooltip: '列表子元素最大节点数量' })
    public maxNodeSize: number = 10;

    @property({ tooltip: '滚动系数' })
    public ratio: number = 0.9;

    start() {
        this.initChildNode();
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    update(deltaTime: number) {
    }

    public setList(list: T[], func: (node: Node, item: T) => void) {
        this.m_List = list;
        this.m_Func = func;
        this.initChildNode();
    }

    private initChildNode() {
        const contentSize = this.getComponent(UITransform).contentSize;
        this.m_Top = contentSize.height / 2;

        this.m_Childs.forEach(r => r.node.destroy());
        this.m_Childs = [];
        this.m_TotalHeight = 0;

        const childPrefabSize = Math.min(this.maxNodeSize, this.m_List.length);
        if (childPrefabSize < 1)
            return;

        for (let i = 0; i < childPrefabSize; i++) {
            const node = instantiate(this.prefab);
            const contentSize = node.getComponent(UITransform).contentSize;
            node.setPosition(node.position.x, this.m_Top - (i * contentSize.height) - contentSize.height / 2);
            node.parent = this.node;
            this.m_Func?.(node, this.m_List[i]);
            this.m_Childs.push({
                node: node,
                index: i
            });

            this.m_TotalHeight += contentSize.height;
        }

        this.m_Bottom = this.m_Top - this.m_TotalHeight;
    }

    private onTouchCancel(_: EventTouch) {
        this.m_IsMove = false;
    }

    private onTouchEnd(_: EventTouch) {
        this.m_IsMove = false;
    }

    private onTouchMove(event: EventTouch) {
        if (this.m_IsMove) {
            const location = event.getUILocation(this.m_TouchLocation);
            const diff = location.y - this.m_LastY;
            this.m_LastY = location.y;
            this.m_Childs.forEach(r => {
                let y = r.node.position.y + diff;
                const contentSize = r.node.getComponent(UITransform).contentSize;
                if (y >= (this.m_Top + contentSize.height / 2)) {
                    y -= this.m_TotalHeight;
                    r.index = (r.index + this.m_Childs.length) % this.m_List.length;
                    this.m_Func?.(r.node, this.m_List[r.index]);
                } else if (y <= (this.m_Bottom + contentSize.height / 2)) {
                    y += this.m_TotalHeight;
                    r.index = ((r.index - this.m_Childs.length) + this.m_List.length) % this.m_List.length;
                    this.m_Func?.(r.node, this.m_List[r.index]);
                }
                r.node.setPosition(r.node.position.x, y);
            });
        }
    }

    private onTouchStart(event: EventTouch) {
        this.m_IsMove = true;
        this.m_LastY = event.getUILocation(this.m_TouchLocation).y;
    }
}
