(define (length lst n)
	(if (equal? lst '())
		n
		(length (cdr lst) (+ n 1))
	)
)


(define (listTraversal lst)
(if (equal? () lst)
'()
(cons (car lst)
	(listTraversal (cdr lst)))
	))

(define (listRevHelper lst acc)
	(if (equal? () lst)
		acc
		(listRevHelper (cdr lst) (cons (car lst) acc)

		)

	)
)

(define (listRev lst)
	(listRevHelper lst ()))

(define (map f lst)
	(if (equal? () lst)
		'()
		(cons (f (car lst))
			(map f (cdr lst))
			)
	)
)

(define (rev_map_helper f lst acc)
	(if (equal? lst ())
		acc
		(rev_map_helper f (cdr lst) (cons (f (car lst)) acc))
	)
)

(define (rev_map f lst)
	(rev_map_helper f lst ())
)

(define (factorial n)
	(if (zero? n) 1
		(* n (factorial (- n 1)))))

(define (tail_rec_factorial n)
	(fact_helper n 1)
)

(define (fact_helper n acc)
	(if (zero? n)
		acc
		(fact_helper (- n 1) (* n acc))
		)
)

(define (fibonacci n)
     (if (< n 2) n
         (+ (fibonacci (- n 1))
            (fibonacci (- n 2)))))

(define (dynamic_fib n)
	(fib_helper n 0 1)
)

(define (fib_helper n prev1 prev2)
	(if (equal? n 2) 
			(+ prev1 prev2)
			(fib_helper (- n 1) prev2 (+ prev2 prev1))
			)
	)
)

(define (fold_left f acc lst)
	(if (equal? lst ())
		acc
		(fold_left f (f acc (car lst)) (cdr lst))
		)
)

(define (fold_right f lst acc)
	(if (equal? lst ())
		acc
		(fold_right f (cdr lst) (f (car lst) acc))
	)
)

(define (treeDelete tree item)

)

(define (listToTree lst)
	(fold_left treeInsert (list car lst) (cdr lst))
)

(define (data tree) 
	(if (equals? (cdr tree) ()) (car tree) (cadr tree))
)

(define (lTree tree)
	(caddr tree)
)

(define (rTree tree)
	(car tree)
)

(define (lTreeNull tree) 
	(equal? (lTree tree) ()))

(define (rTreeNull tree)
	(equal? (rTree tree) ()))

(define (isLeaf tree) (equal? () (cdr tree)))

(define (isNullTree tree) (equal? () tree))

;;;My Ocaml code for reference

;type 'a binaryTree = Node of 'a binaryTree * 'a * 'a binaryTree | Leaf

;let rec bstInsert elem root =
  ;match root with 
    ;|Node(left, x, right) -> if elem > x 
      ;then Node(left, x, (bstInsert elem right))
      ;else Node((bstInsert elem left), x, right)
    ;|Leaf -> Node(Leaf, elem, Leaf)

  

;let bstFromList lst =
  ;let rec helper lst acc =
    ;match lst with
      ;|[] -> acc
      ;|h::tl -> helper tl (bstInsert h acc) in
      ;helper lst Leaf 

 (define (treeInsert tree item)
	(if (isLeaf tree) 
		item
		
		)
)

(define (binarySearch tree item)
	(if (isNullTree tree)
		#f
		(let ((dat (data tree)))
			(if (= item dat)
				#t
				(if (> item dat)
					(binarySearch (rTree tree) item)
					(binarySearch (lTree tree) item)
				)
			)
		)
	)
)