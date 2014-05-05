app.controller('SideMenuCtrl',function($scope){
	// private variables
	var self = this,
		ctx,
		rightShowing = false,
		leftShowing = false,
		isDragging,
		dragThresholdX = 10,//how much you need to drag before menu starts moving.
		startX,
		lastX,
		offsetX;

	// private methods
	/**
	 * @return {float} The amount the side menu is open. Either positive or negative for left (positive), or right (negative).
	 */
	var getOpenAmount = function(){
		return ctx && ctx.getTranslateX() || 0;
	};

	/**
	 * @returns {float} The ratio of open amount over menu width. For example, a
	 * menu of width 100 open 50 pixels would be open 50% or a ratio of 0.5.  Value is negative
	 * for right menu.
	 */
	var getOpenRatio = function(){
		var amt = getOpenAmount();
		return (amt >= 0) ? amt / ctx.left.width : amt / ctx.right.width;
	};

	/**
	 * @return {float} The percentage of open amount over menu width. For example, a
	 * menu of width 100 open 50 pixels would be open 50%. Value is negative
	 * for right menu.
	 */
	var getOpenPercentage = function() {
		return getOpenRatio() * 100;
	};

	/**
	 * Open the menu with a given percentage amount.
	 * @param {number} percentage The percentage (positive or negative for left/right) to open the menu.
	 */
	var openPercentage = function(percentage) {
		var p = percentage / 100;

		if(ctx.left && percentage >= 0) {
			openAmount(ctx.left.width * p);
			if(p == 1){
				ctx.showOverlay();
			}else{
				ctx.hideOverlay();
			}
		} else if(ctx.right && percentage < 0) {
			var maxRight = ctx.right.width;
			openAmount(ctx.right.width * p);
		}
	};

	/**
	 * Open the menu the given pixel amount.
	 * @param {float} amount the pixel amount to open the menu. Positive value for left menu,
	 * negative value for right menu (only one menu will be visible at a time).
	 */
	var openAmount = function(amount) {
		if(!ctx.canBeOpen()){ amount = 0; }

		var maxLeft = ctx.left && ctx.left.width || 0;
		var maxRight = ctx.right && ctx.right.width || 0;

		// Check if we can move to that side, depending if the left/right panel is enabled
		if(!(ctx.left && ctx.left.isEnabled) && amount > 0) {
			ctx.setTranslateX(0);
			return;
		}

		if(!(ctx.right && ctx.right.isEnabled) && amount < 0) {
			ctx.setTranslateX(0);
			return;
		}

		if(leftShowing && amount > maxLeft) {
			ctx.setTranslateX(maxLeft);
			return;
		}

		if(rightShowing && amount < -maxRight) {
			ctx.setTranslateX(-maxRight);
			return;
		}

		ctx.setTranslateX(amount);

		if(amount >= 0) {
			leftShowing = true;
			rightShowing = false;

//			if(amount > 0) {
//				// Push the z-index of the right menu down
//				ctx.right && ctx.right.pushDown && ctx.right.pushDown();
//				// Bring the z-index of the left menu up
//				ctx.left && ctx.left.bringUp && ctx.left.bringUp();
//			}
		} else {
			rightShowing = true;
			leftShowing = false;

//			// Bring the z-index of the right menu up
//			ctx.right && ctx.right.bringUp && ctx.right.bringUp();
//			// Push the z-index of the left menu down
//			ctx.left && ctx.left.pushDown && ctx.left.pushDown();
		}
	};

	/**
	 * Given an event object, find the final resting position of this side
	 * menu. For example, if the user "throws" the content to the right and
	 * releases the touch, the left menu should snap open (animated, of course).
	 *
	 * @param {Event} e the gesture event to use for snapping
	 */
	var snapToRest = function(e) {
		if(!ctx.canBeOpen()){
			openPercentage(0);
			return false;
		}

		console.log('WHY');

		// We want to animate at the end of this
		ctx.enableAnimation();
		isDragging = false;

		// Check how much the panel is open after the drag, and
		// what the drag velocity is
		var ratio = getOpenRatio();

		if(ratio === 0) {
			// Just to be safe
			openPercentage(0);
			return;
		}

		var velocityThreshold = 0.3;
		var velocityX = e.gesture.velocityX;
		var direction = e.gesture.direction;

		// Less than half, going left
		//if(ratio > 0 && ratio < 0.5 && direction == 'left' && velocityX < velocityThreshold) {
		//this.openPercentage(0);
		//}

		// Going right, less than half, too slow (snap back)
		if(ratio > 0 && ratio < 0.5 && direction == 'right' && velocityX < velocityThreshold) {
			openPercentage(0);
		}

		// Going left, more than half, too slow (snap back)
		else if(ratio > 0.5 && direction == 'left' && velocityX < velocityThreshold) {
			openPercentage(100);
		}

		// Going left, less than half, too slow (snap back)
		else if(ratio < 0 && ratio > -0.5 && direction == 'left' && velocityX < velocityThreshold) {
			openPercentage(0);
		}

		// Going right, more than half, too slow (snap back)
		else if(ratio < 0.5 && direction == 'right' && velocityX < velocityThreshold) {
			openPercentage(-100);
		}

		// Going right, more than half, or quickly (snap open)
		else if(direction == 'right' && ratio >= 0 && (ratio >= 0.5 || velocityX > velocityThreshold)) {
			openPercentage(100);
		}

		// Going left, more than half, or quickly (span open)
		else if(direction == 'left' && ratio <= 0 && (ratio <= -0.5 || velocityX > velocityThreshold)) {
			openPercentage(-100);
		}

		// Snap back for safety
		else {
			openPercentage(0);
		}
	};

	//---- public methods
	/**
	 * Set the content view controller if not passed in the constructor options.
	 *
	 * @param {object} content
	 */
		self.setCtx = function(dirCtx) {
			dirCtx = angular.extend(dirCtx, {
				left: { width: 250, isEnabled: true },
				right: false
			});
		ctx = dirCtx;
	};

	self.isOpenLeft = function() {
		return getOpenAmount() > 0;
	};

	self.isOpenRight = function() {
		return getOpenAmount() < 0;
	};

	/**
	 * Toggle the left menu to open 100%
	 */
	self.toggleLeft = function(shouldOpen) {
		if(!ctx.canBeOpen()){ return false; }

		var openAmount = getOpenAmount();
		if (arguments.length === 0) {
			shouldOpen = openAmount <= 0;
		}
		ctx.enableAnimation();
		if(!shouldOpen) {
			openPercentage(0);
		} else {
			openPercentage(100);
		}
	};

	/**
	 * Toggle the right menu to open 100%
	 */
	self.toggleRight = function(shouldOpen) {
		if(!ctx.canBeOpen()){ return false; }

		var openAmount = getOpenAmount();
		if (arguments.length === 0) {
			shouldOpen = openAmount >= 0;
		}
		ctx.enableAnimation();
		if(!shouldOpen) {
			openPercentage(0);
		} else {
			openPercentage(-100);
		}
	};

	/**
	 * Close all menus.
	 */
	self.close = function() {
		openPercentage(0);
	};



	self.isOpen = function() {
		return getOpenRatio() == 1;
	};

	// End a drag with the given event
	self._endDrag = function(e) {
		if(isDragging) {
			snapToRest(e);
		}
		startX = null;
		lastX = null;
		offsetX = null;
	};

	// Handle a drag event
	self._handleDrag = function(e) {
		// If we don't have start coords, grab and store them
		if(!ctx.canBeOpen){ return false; }

		var pageX = e.gesture.touches[0].pageX;

		if(!startX) {
			startX = pageX;
		}
		lastX = pageX;

		// Calculate difference from the tap points
		if(!isDragging && Math.abs(lastX - startX) > dragThresholdX) {
			// if the difference is greater than threshold, start dragging using the current
			// point as the starting point
			startX = lastX;

			isDragging = true;
			// Initialize dragging
			ctx.disableAnimation();
			offsetX = getOpenAmount();
		}

		if(isDragging) {
			openAmount(offsetX + (lastX - startX));
		}
	};

	// Handle the screen resizing
	self._handleResize = function(){
		if(isDragging){
			ctx.disableAnimation();
			self.close();
			isDragging = false;
		}

		if(self.isOpen() && !ctx.canBeOpen()){
			ctx.disableAnimation();
			self.close();
		}
	};
});