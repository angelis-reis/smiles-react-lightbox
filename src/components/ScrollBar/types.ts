export interface IScrollBar {
	/**
	 * ScrollBar color
	 */
	color?: string;
	/**
	 * ScrollBar height
	 */
	height?: number;
	/**
	 * ScrollBar direction
	 */
	direction?: 'right' | 'left';
	/**
	 * ScrollBar position
	 */
	position?: 'top' | 'bottom';
	/**
	 * ScrollBar color gradient
	 */
	gradient?: boolean;
	/**
	 * ScrollBar gradient colors
	 */
	gradientColor?: string;
	// /**
	//  * ScrollBar gradient colors
	//  */
	// container: Element;
}
