// Magic Page Wiz - Drag and Drop Functionality
class DragDropManager {
    constructor() {
        this.draggedElement = null;
        this.init();
    }

    init() {
        this.setupElementDragHandlers();
        this.setupCanvasDropHandlers();
    }

    setupElementDragHandlers() {
        const elementItems = document.querySelectorAll('.element-item');
        
        elementItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                const elementType = e.target.closest('.element-item').dataset.element;
                this.draggedElement = { type: elementType, source: 'palette' };
                
                e.target.classList.add('element-dragging');
                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('text/plain', elementType);
            });

            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('element-dragging');
                this.draggedElement = null;
            });
        });
    }

    setupCanvasDropHandlers() {
        const canvas = document.getElementById('pageCanvas');

        canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            canvas.classList.add('drag-over');
        });

        canvas.addEventListener('dragleave', (e) => {
            if (!canvas.contains(e.relatedTarget)) {
                canvas.classList.remove('drag-over');
            }
        });

        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            canvas.classList.remove('drag-over');

            if (this.draggedElement && this.draggedElement.source === 'palette') {
                const elementType = this.draggedElement.type;
                
                // Add the element to the page
                if (window.pageBuilder) {
                    window.pageBuilder.addElement(elementType);
                }
            }
        });
    }

    // Enable sorting of elements in canvas
    setupCanvasSorting() {
        const canvas = document.getElementById('pageCanvas');
        let draggedCanvasElement = null;

        canvas.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('canvas-element')) {
                draggedCanvasElement = e.target;
                e.dataTransfer.effectAllowed = 'move';
                e.target.style.opacity = '0.5';
            }
        });

        canvas.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('canvas-element')) {
                e.target.style.opacity = '';
                draggedCanvasElement = null;
            }
        });

        canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(canvas, e.clientY);
            
            if (draggedCanvasElement) {
                if (afterElement == null) {
                    canvas.appendChild(draggedCanvasElement);
                } else {
                    canvas.insertBefore(draggedCanvasElement, afterElement);
                }
            }
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.canvas-element:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
}

// Initialize drag and drop when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.builder-container')) {
        window.dragDropManager = new DragDropManager();
        console.log('🎯 Drag and Drop initialized successfully!');
    }
});