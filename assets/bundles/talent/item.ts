import { _decorator, Component, Label } from 'cc';

import { Talent } from '../../model';

const { ccclass } = _decorator;

@ccclass('TalentItem')
export class TalentItem extends Component {

    private m_LevelLabel: Label;
    protected get levelLabel() {
        return this.m_LevelLabel ??= this.node.getChildByPath('left/level').getComponent(Label);
    }

    private m_TitleLabel: Label;
    protected get titleLevel() {
        return this.m_TitleLabel ??= this.node.getChildByPath('right/content-mask/content/title').getComponent(Label);
    }

    private m_DescLabel: Label;
    protected get descLabel() {
        return this.m_DescLabel ??= this.node.getChildByPath('right/content-mask/content/desc').getComponent(Label);
    }

    start() {
    }

    update(deltaTime: number) {

    }

    public setData(talent: Talent) {
        this.levelLabel.string = talent.level.toString();
        this.titleLevel.string = talent.title;
        this.descLabel.string = talent.desc;
    }
}
