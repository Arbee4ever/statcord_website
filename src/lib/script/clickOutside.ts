export function clickOutside(node) {
  
	const handleClick = (event: { target: any; defaultPrevented: any; }) => {
	  if (node && !node.contains(event.target) && !event.defaultPrevented) {
		node.dispatchEvent(
		  new CustomEvent('click_outside', node)
		)
	  }
	}

	const handleNodeClick = event => {
		event.preventDefault();
	}
  
	  document.addEventListener('click', handleClick, true);
	  node.addEventListener("click", handleNodeClick, true);
	
	return {
	  destroy() {
		document.removeEventListener('click', handleClick, true);
		node.removeEventListener("click", handleNodeClick, true);
	  }
	  }
  }