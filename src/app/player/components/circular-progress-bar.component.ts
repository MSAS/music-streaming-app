import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "circularProgressBar",
    template: `
    <GridLayout [height]="height" [width]="height">
        <RadRadialGauge>
            <RadialScale tkRadialGaugeScales startAngle="135" sweepAngle="270">
                <ScaleStyle tkRadialScaleStyle ticksVisible="false" labelsVisible="false" lineThickness="0">
                </ScaleStyle>

                <RadialBarIndicator tkRadialScaleIndicators minimum="0" maximum="100">
                    <BarIndicatorStyle tkRadialBarIndicatorStyle [fillColor]="fillBackgroundColor" cap="Round" barWidth="0.05">
                    </BarIndicatorStyle>
                </RadialBarIndicator>

                <RadialBarIndicator tkRadialScaleIndicators minimum="0" [maximum]="value" isAnimated="true">
                    <BarIndicatorStyle tkRadialBarIndicatorStyle [fillColor]="fillColor" cap="Round" barWidth="0.05">
                    </BarIndicatorStyle>
                </RadialBarIndicator>
            </RadialScale>
        </RadRadialGauge>
        </GridLayout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularProgressBarComponent {
    @Input() size = 100;
    @Input() progress = 0;
    @Input() textColor = "#bfbfc4";
    @Input() fillColor = "#FDA458";
    @Input() fillBackgroundColor = "#efeff4";
    @Input() offset = 0;

    get height() {
        return Math.min(this.size, 250);
    };
    get value() {
        return Math.min(this.progress, 100);
    };
    get text() {
        return `${this.value.toFixed()}%`;
    };
    get textSize() {
        return this.height / 3.5;
    };
}